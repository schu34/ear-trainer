import { atom, selector } from "recoil";
import {
  allIntervals,
  getNotesForInterval,
  getRandomInterval,
  Interval,
  IntervalShortName,
} from "./intervals";
import { Note } from "./sound";

interface Settings {
  mode: "interval";
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

const defaultSettings: Settings = {
  mode: "interval",
  ascending: true,
  descending: true,
  intervalsSelection: allIntervals.slice(),
  delay: 300,
};

export const settingsState = atom<Settings>({
  key: "mode",
  default: defaultSettings,
});

export const questionHistoryState = atom<QuestionHistory[]>({
  key: "questionHistory",
  default: [],
});

export const currentQuestionState = atom<Question>({
  key: "currentQuestion",
  default: createIntervalQuestion(defaultSettings),
});

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

export const statsSelector = selector<Stats>({
  key: "stats",
  get: ({ get }) => {
    const history = get(questionHistoryState);
    const correct = history.filter(({ correct }) => correct).length;
    const incorrect = history.filter(({ correct }) => !correct).length;

    return {
      total: history.length,
      correct,
      incorrect,
      percentCorrect: Math.round((correct / history.length) * 100),
    };
  },
});
