import { atom } from "jotai";
import {
  allIntervals,
  getNotesForInterval,
  getRandomInterval,
  Interval,
  IntervalShortName,
} from "./intervals";
import { Note } from "./sound";
import { getIntervalListFromSelection } from "./util";

type Mode = "interval"; // | "chord" | "scale" | "note";

interface Settings {
  mode: Mode;
  ascending: boolean;
  descending: boolean;
  intervalsSelection: IntervalShortName[];
  delay: number;
}

interface Question {
  mode: "interval";
  answer: Interval;
  notes: Note[];
  index: number;
}

export interface QuestionHistory extends Question {
  correct: boolean;
}

export const settingsSelector = atom<Settings>((get) => {
  const mode = get(settingsModeState);
  const delay = get(settingsDelayState);
  const ascending = get(settingsAscendingState);
  const descending = get(settingsDescendingState);
  const intervalsSelection = get(settingsIntervalsSelectionState);

  return {
    mode,
    delay,
    ascending,
    descending,
    intervalsSelection: getIntervalListFromSelection(intervalsSelection),
  };
});

const settingsModeState = atom<Mode>("interval");

export const settingsDelayState = atom(300);

export const settingsAscendingState = atom(true);

export const settingsDescendingState = atom(true);

export const settingsIntervalsSelectionState = atom<
  Record<IntervalShortName, boolean>
>(
  allIntervals.slice().reduce((acc, interval) => {
    acc[interval] = true;
    return acc;
  }, {} as Record<IntervalShortName, boolean>)
);

export const questionHistoryState = atom<QuestionHistory[]>([]);

export const currentQuestionState = atom<Question | null>(null);

function getDirection(settings: Settings) {
  if (settings.ascending && settings.descending) {
    return Math.random() > 0.5 ? "ascending" : "descending";
  } else if (settings.ascending) {
    return "ascending";
  } else if (settings.descending) {
    return "descending";
  }
  throw new Error("No direction selected");
}

export function createIntervalQuestion(
  settings: Settings,
  index = 0
): Question {
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
