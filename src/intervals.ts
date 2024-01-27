import { Note, allNotes } from "./sound";
import { getRandomIntegerInRange } from "./util";

const intervalsShortToLong = {
  P1: "Perfect Unison",
  m2: "Minor Second",
  M2: "Major Second",
  m3: "Minor Third",
  M3: "Major Third",
  P4: "Perfect Fourth",
  T: "Tritone",
  P5: "Perfect Fifth",
  m6: "Minor Sixth",
  M6: "Major Sixth",
  m7: "Minor Seventh",
  M7: "Major Seventh",
  P8: "Perfect Octave",
};

export const shortNameToInterval = Object.keys(intervalsShortToLong).reduce(
  (acc, shortName, i) => {
    const sn = shortName as IntervalShortName;
    acc[sn] = {
      type: "INTERVAL",
      shortName: sn,
      longName: intervalsShortToLong[sn],
      halfSteps: i,
    };
    return acc;
  },
  {} as Record<IntervalShortName, Interval>
);

export type IntervalShortName = keyof typeof intervalsShortToLong;
type IntervalLongName = (typeof intervalsShortToLong)[IntervalShortName];

const allIntervalsLong = Object.values(
  intervalsShortToLong
) as IntervalLongName[];

export const allIntervals = Object.keys(
  intervalsShortToLong
) as IntervalShortName[];

export interface Interval {
  type: "INTERVAL";
  shortName: IntervalShortName;
  longName: IntervalLongName;
  halfSteps: number;
}

const intervals: Interval[] = allIntervals.map((shortName, index) => ({
  type: "INTERVAL",
  shortName,
  longName: allIntervalsLong[index],
  halfSteps: index,
}));

const intervalsByShortName: Record<IntervalShortName, Interval> =
  intervals.reduce((acc, interval) => {
    acc[interval.shortName] = interval;
    return acc;
  }, {} as Record<IntervalShortName, Interval>);

export function getRandomInterval(
  options: IntervalShortName[] = allIntervals.slice()
): Interval {
  const selection = getRandomIntegerInRange(0, options.length - 1);
  const intervalName = options[selection];
  return intervalsByShortName[intervalName];
}

export function getNotesForInterval({
  halfSteps,
  ascending = true,
}: {
  halfSteps: number;
  ascending?: boolean;
}): [Note, Note] {
  const notes = allNotes;
  const maximumIndexForLowNote = notes.length - halfSteps;

  const lowNote = getRandomIntegerInRange(0, maximumIndexForLowNote);
  const highNote = lowNote + halfSteps;

  return ascending
    ? [notes[lowNote], notes[highNote]]
    : [notes[highNote], notes[lowNote]];
}

export function getNoteByInterval(
  start: Note,
  interval: IntervalShortName,
  up = true
) {
  const notes = allNotes;
  const intervalObj = intervalsByShortName[interval];
  const startIndex = notes.indexOf(start);
  let endIndex;
  if (up) {
    endIndex = startIndex + intervalObj.halfSteps;
  } else {
    endIndex = startIndex - intervalObj.halfSteps;
  }
  if (!notes[endIndex])
    throw new Error(`No note found for interval ${interval} from ${start}`);
  return notes[endIndex];
}

export { allNotes };
