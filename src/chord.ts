import { allNotes, Note } from "./sound";
import { getRandomArrayElement, getRandomIntegerInRange } from "./util";
import {
  getNoteByInterval,
  IntervalShortName,
  shortNameToInterval,
} from "./intervals";
import { Direction } from "./state";

export const chordTypes = [
  "maj",
  "min",
  "dim",
  "aug",
  "sus4",
  "sus2",
  "maj7",
  "min7",
  "dom7",
  "dim7",
  "half-dim7",
] as const;

export type ChordType = (typeof chordTypes)[number];

const ChordDisplayNames = {
  maj: "Major",
  min: "Minor",
  dim: "Diminished",
  aug: "Augmented",
  sus4: "Sus4",
  sus2: "Sus2",
  maj7: "Major 7th",
  min7: "Minor 7th",
  dom7: "Dominant 7th",
  dim7: "Diminished 7th",
  "half-dim7": "Half Diminished 7th",
} as const;

type ChordDisplayName = (typeof ChordDisplayNames)[ChordType];

export interface Chord {
  type: "CHORD";
  shortName: ChordType;
  longName: ChordDisplayName;
  intervals: IntervalShortName[];
}

const intervals: Record<ChordType, IntervalShortName[]> = {
  maj: ["M3", "P5"],
  min: ["m3", "P5"],
  dim: ["m3", "T"],
  aug: ["M3", "T"],
  sus4: ["P4", "P5"],
  sus2: ["M2", "P5"],
  maj7: ["M3", "P5", "M7"],
  min7: ["m3", "P5", "m7"],
  dom7: ["M3", "P5", "m7"],
  dim7: ["m3", "T", "m7"],
  "half-dim7": ["m3", "T", "m7"],
};

export const shortNameToChord = chordTypes.reduce((acc, ct) => {
  const chordType = ct as ChordType;
  acc[chordType] = {
    type: "CHORD",
    shortName: ct,
    longName: ChordDisplayNames[ct],
    intervals: intervals[ct],
  };
  return acc;
}, {} as Record<ChordType, Chord>);

export const getRandomChord = (
  typeOptions: readonly ChordType[] = chordTypes
): Chord => {
  const chordType = getRandomArrayElement(typeOptions) as ChordType;
  return {
    type: "CHORD",
    shortName: chordType,
    longName: ChordDisplayNames[chordType],
    intervals: intervals[chordType],
  };
};

export const getNotesForChord = (
  chordType: ChordType,
  direction: Direction
): Note[] => {
  const root = getChordRoot(chordType);
  const chordNotes = buildChord(root, chordType);

  if (direction === "descending") {
    return chordNotes.reverse();
  }
  return chordNotes;
};

const getMaxIntervalInChord = (chord: ChordType) => {
  const maxInterval = intervals[chord][intervals[chord].length - 1];
  return maxInterval;
};

const getChordRoot = (chord: ChordType) => {
  //the max interval is always the last one in the array since that's how we've defined it above
  const maxInterval = getMaxIntervalInChord(chord);
  const maxIntervalHalfSteps = shortNameToInterval[maxInterval].halfSteps;
  const noteIndex = getRandomIntegerInRange(
    0,
    allNotes.length - maxIntervalHalfSteps
  );
  return allNotes[noteIndex];
};

const buildChord = (root: Note, chordType: ChordType) => {
  const notes = [root];
  const intervalShortNames = intervals[chordType];
  intervalShortNames.forEach((intervalShortName) => {
    const note = getNoteByInterval(root, intervalShortName);
    notes.push(note);
  });
  return notes;
};
