import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import { playNotesSeq } from "./sound";
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

  const playQuestionSound = React.useCallback(() => {
    playNotesSeq(currentQuestion.notes, settings.delay);
  }, [currentQuestion]);

  const getNextQuestion = React.useCallback(() => {
    setCurrentQuestion(
      createIntervalQuestion(settings, currentQuestion.index + 1)
    );
  }, [currentQuestion, setCurrentQuestion, settings]);

  const guess = React.useCallback(
    (interval: Interval) => {
      //guess logic
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
    [currentQuestion, getNextQuestion, setQuestionHistory]
  );

  React.useEffect(() => {
    playQuestionSound();
  }, [currentQuestion]);

  return {
    playQuestionSound,
    correctAnswer: currentQuestion.answer.shortName,
    nextQuestion: getNextQuestion,
    guess,
  };
};
