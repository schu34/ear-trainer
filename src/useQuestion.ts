import React from "react";
import "./App.css";
import { playNotesSeq } from "./sound";
import {
  currentQuestionState,
  questionHistoryState,
  settingsSelector,
  createQuestion,
  QuestionHistory,
  attemptsState,
} from "./state";
import { Interval } from "./intervals";
import produce from "immer";
import { useAtom, useSetAtom } from "jotai";
import { Chord } from "./chord";

export const useQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useAtom(currentQuestionState);

  const setQuestionHistory = useSetAtom(questionHistoryState);

  const [settings] = useAtom(settingsSelector);
  console.log("settings:", settings);
  const [attempts, setAttempts] = useAtom(attemptsState);

  const playQuestionSound = React.useCallback(() => {
    if (!currentQuestion) return;
    const isQuestionUnison = currentQuestion.direction === "unison";
    playNotesSeq(currentQuestion.notes, isQuestionUnison ? 0 : settings.delay);
  }, [currentQuestion, settings.delay]);

  const getNextQuestion = React.useCallback(() => {
    // if (!currentQuestion) return;
    setAttempts(0);
    const nextIndex = currentQuestion ? currentQuestion.index + 1 : 0;
    setCurrentQuestion(createQuestion(settings, nextIndex));
  }, [currentQuestion, setCurrentQuestion, settings]);

  const guess = React.useCallback(
    (answer: Interval | Chord) => {
      if (!currentQuestion) return;
      if (answer.shortName === currentQuestion.answer.shortName) {
        setQuestionHistory((prev: QuestionHistory[]) => {
          return produce(prev, (draft) => {
            draft[currentQuestion.index] = {
              ...currentQuestion,
              correct: true && (prev?.[currentQuestion.index]?.correct ?? true),
            };
          });
        });
        getNextQuestion();
      } else {
        setAttempts(attempts + 1);
        setQuestionHistory((prev: QuestionHistory[]) => {
          return produce(prev, (draft) => {
            draft[currentQuestion.index] = {
              ...currentQuestion,
              correct: false,
            };
          });
        });
      }
      return;
    },
    [currentQuestion, getNextQuestion, setQuestionHistory, attempts]
  );

  // we don't want to re-run this effect when the settings change, only when the
  // question changes. `playQuestionSound` changes when the settings change (the
  // delay in particular), so we purposely omit it from the dependency array.
  React.useEffect(() => {
    playQuestionSound();
  }, [currentQuestion]);

  return {
    playQuestionSound,
    //TODO: this should probably return the whole answer
    correctAnswer: currentQuestion?.answer.longName,
    nextQuestion: getNextQuestion,
    guess,
    attempts,
  };
};
