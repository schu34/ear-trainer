import { Note } from "./sound";
import { getRandomIntegerInRange } from "./util";
import { acoustic_grand_piano } from "./acoustic_grand_piano";

const defaultNotes = Object.keys(acoustic_grand_piano) as Note[];

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
      shortName:sn,
      longName: intervalsShortToLong[sn],
      halfSteps: i
    };
    return acc;
  },
  {} as Record<IntervalShortName, Interval>
);

export type IntervalShortName = keyof typeof intervalsShortToLong;
export type IntervalLongName = typeof intervalsShortToLong[IntervalShortName];


export const allIntervalsShort = Object.keys(
  intervalsShortToLong
) as IntervalShortName[];

export const allIntervalsLong = Object.values(
  intervalsShortToLong
) as IntervalLongName[];

export const allIntervals = Object.keys(
  intervalsShortToLong
) as IntervalShortName[];

export interface Interval {
  shortName: IntervalShortName;
  longName: IntervalLongName;
  halfSteps: number;
}

export const intervals: Interval[] = allIntervals.map((shortName, index) => ({
  shortName,
  longName: allIntervalsLong[index],
  halfSteps: index,
}));

export const intervalsByShortName: Record<IntervalShortName, Interval> =
  intervals.reduce((acc, interval) => {
    acc[interval.shortName] = interval;
    return acc;
  }, {} as Record<IntervalShortName, Interval>);

export function getRandomInterval(
  options: IntervalShortName[] = allIntervals.slice()
): Interval {
  const selection = Math.floor(Math.random() * options.length);
  const intervalName = options[selection];
  return intervalsByShortName[intervalName];
}

export function getNotesForInterval({
  halfSteps,
  notes = defaultNotes,
  ascending = true,
}: {
  halfSteps: number;
  notes?: Note[];
  ascending?: boolean;
}): [Note, Note] {
  const maximumIndexForLowNote = notes.length - halfSteps;

  const lowNote = getRandomIntegerInRange(0, maximumIndexForLowNote);
  const highNote = lowNote + halfSteps;

  return ascending
    ? [notes[lowNote], notes[highNote]]
    : [notes[highNote], notes[lowNote]];
}
