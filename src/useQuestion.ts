import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import { playNotesSeq, stopAllSounds } from "./sound";
import {
  createIntervalQuestion,
  currentQuestionState,
  questionHistoryState,
  settingsState,
  QuestionHistory,
} from "./state";
import { Interval } from "./intervals";
import produce from "immer";

export const useQuestion = () => {
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(currentQuestionState);

  const setQuestionHistory = useSetRecoilState(questionHistoryState);

  const settings = useRecoilValue(settingsState);
  const [attempts, setAttempts] = React.useState(0);

  const playQuestionSound = React.useCallback(() => {
    playNotesSeq(currentQuestion.notes, settings.delay);
  }, [currentQuestion]);

  const getNextQuestion = React.useCallback(() => {
    setAttempts(0);
    setCurrentQuestion(
      createIntervalQuestion(settings, currentQuestion.index + 1)
    );
		stopAllSounds();
  }, [currentQuestion, setCurrentQuestion, settings]);

  const guess = React.useCallback(
    (interval: Interval) => {
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

  React.useEffect(() => {
    playQuestionSound();
  }, [currentQuestion]);

  return {
    playQuestionSound,
    correctAnswer: currentQuestion.answer.longName,
    nextQuestion: getNextQuestion,
    guess,
    attempts,
  };
};
