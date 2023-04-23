import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import { playNotesSeq, stopAllSounds } from "./sound";
import {
  createIntervalQuestion,
  currentQuestionState,
  questionHistoryState,
  settingsSelector,
  QuestionHistory,
} from "./state";
import { Interval } from "./intervals";
import produce from "immer";

export const useQuestion = () => {
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(currentQuestionState);

  const setQuestionHistory = useSetRecoilState(questionHistoryState);

  const settings = useRecoilValue(settingsSelector);
  const [attempts, setAttempts] = React.useState(0);

  const playQuestionSound = React.useCallback(() => {
    if (!currentQuestion) return;
    playNotesSeq(currentQuestion.notes, settings.delay);
  }, [currentQuestion, settings.delay]);

  const getNextQuestion = React.useCallback(() => {
    // if (!currentQuestion) return;
    setAttempts(0);
    const nextIndex = currentQuestion ? currentQuestion.index + 1 : 0;
    setCurrentQuestion(createIntervalQuestion(settings, nextIndex));
    stopAllSounds();
  }, [currentQuestion, setCurrentQuestion, settings]);

  const guess = React.useCallback(
    (interval: Interval) => {
      if (!currentQuestion) return;
      if (interval.shortName === currentQuestion.answer.shortName) {
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
    correctAnswer: currentQuestion?.answer.longName,
    nextQuestion: getNextQuestion,
    guess,
    attempts,
  };
};
