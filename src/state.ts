import { atom } from "jotai";
import {
  allIntervals,
  getNotesForInterval,
  getRandomInterval,
  Interval,
  IntervalShortName,
} from "./intervals";
import { Note } from "./sound";
import { getRandomArrayElement, getTruthyKeys } from "./util";
import {
  Chord,
  ChordType,
  chordTypes,
  getNotesForChord,
  getRandomChord,
} from "./chord";

const modes = ["interval", "chord"];
type Mode = (typeof modes)[number];

interface Settings {
  mode: Mode;
  ascending: boolean;
  descending: boolean;
  unison: boolean;
  intervalsSelection: IntervalShortName[];
  chordSelection: ChordType[];
  delay: number;
}

type IntervalQuestion = {
  mode: "interval";
  answer: Interval;
  notes: Note[];
  index: number;
  direction: Direction;
};

type ChordQuestion = {
  mode: "chord";
  answer: Chord;
  notes: Note[];
  index: number;
  direction: Direction;
};

type Question = IntervalQuestion | ChordQuestion;

interface IntervalQuestionHistory extends IntervalQuestion {
  correct: boolean;
}

interface ChordQuestionHistory extends ChordQuestion {
  correct: boolean;
}

export type QuestionHistory = IntervalQuestionHistory | ChordQuestionHistory;

export const settingsSelector = atom<Settings>((get) => {
  const mode = get(settingsModeState);
  const delay = get(settingsDelayState);
  const ascending = get(settingsAscendingState);
  const descending = get(settingsDescendingState);
  const unison = get(settingsUnisonState);
  const intervalsSelection = get(settingsIntervalsSelectionState);
  const chordSelection = get(settingsChordSelectionState);

  return {
    mode,
    delay,
    ascending,
    descending,
    unison,
    intervalsSelection: getTruthyKeys(intervalsSelection),
    chordSelection: getTruthyKeys<ChordType>(chordSelection),
  };
});

export enum Direction {
  ascending = "ascending",
  descending = "descending",
  unison = "unison",
}

export const settingsModeState = atom<Mode>("interval");

export const settingsDelayState = atom(300);

export const settingsAscendingState = atom(true);

export const settingsDescendingState = atom(true);

export const settingsUnisonState = atom(true);

export const settingsIntervalsSelectionState = atom<
  Record<IntervalShortName, boolean>
>(
  allIntervals.slice().reduce(
    (acc, interval) => {
      acc[interval] = true;
      return acc;
    },
    {} as Record<IntervalShortName, boolean>,
  ),
);

export const settingsChordSelectionState = atom<Record<string, boolean>>(
  chordTypes.reduce(
    (acc, chord) => {
      acc[chord] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  ),
);

export const attemptsState = atom<number>(0);

export const questionHistoryState = atom<
  (ChordQuestionHistory | IntervalQuestionHistory)[]
>([]);

export const currentQuestionState = atom<Question | null>(null);

function getDirection(settings: Settings): Direction {
  const possibleDirections: readonly Direction[] = [
    Direction.ascending,
    Direction.descending,
    Direction.unison,
  ].filter((direction) => settings[direction as keyof Settings]);
  return getRandomArrayElement(possibleDirections);
  // throw new Error("No direction selected");
}

export function createQuestion(settings: Settings, index: number): Question {
  const creator = questionCreators[settings.mode];
  return creator(settings, index);
}

const questionCreators: Record<
  Mode,
  (settings: Settings, index: number) => Question
> = {
  interval: createIntervalQuestion,
  chord: createChordQuestion,
};

function createIntervalQuestion(
  settings: Settings,
  index = 0,
): IntervalQuestion {
  const direction = getDirection(settings);
  const interval = getRandomInterval(settings.intervalsSelection);
  const notes = getNotesForInterval({
    halfSteps: interval.halfSteps,
    ascending: direction === "ascending",
  });

  return {
    mode: "interval",
    answer: interval,
    notes,
    index,
    direction,
  };
}

function createChordQuestion(settings: Settings, index = 0): ChordQuestion {
  const direction = getDirection(settings);
  const chord = getRandomChord(settings.chordSelection);
  const notes = getNotesForChord(chord.shortName, direction);

  return {
    mode: "chord",
    answer: chord,
    notes,
    index,
    direction,
  };
}

export interface Stats {
  total: number;
  correct: number;
  incorrect: number;
  percentCorrect: number;
}

export const statsSelector = atom<Stats>((get) => {
  const history = get(questionHistoryState);
  const correct = history.filter(({ correct }) => correct).length;
  const incorrect = history.filter(({ correct }) => !correct).length;

  return {
    total: history.length,
    correct,
    incorrect,
    percentCorrect: Math.round((correct / history.length) * 100),
  };
});
