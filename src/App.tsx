import React from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import { IntervalSelector } from "./IntervalSelector";
import { AudioElements } from "./sound";
import { acoustic_grand_piano } from "./acoustic_grand_piano";
import { statsSelector, Stats } from "./state";
import { useQuestion } from "./useQuestion";
import { Options } from "./options";

function App() {
  const { playQuestionSound, correctAnswer, nextQuestion, guess, attempts } =
    useQuestion();

  const stats = useRecoilValue(statsSelector);

  return (
    <div className="container ">
      <div className="title">Interval Trainer</div>
      <div className="columns">
        <div className="column">
          <Options />
        </div>
        <div className="column is-one-third">
          <div className="columns is-mobile">
            <div className="column is-fluid">
              <button
                className="button is-primary control-button"
                onClick={() => {
                  playQuestionSound();
                }}
              >
                Play Again
              </button>
            </div>
            <div className="column">
              <button className="button control-button" onClick={nextQuestion}>
                {correctAnswer ? "Next Question" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-third">
          <IntervalSelector
            onSelect={(arg) => {
              guess(arg);
            }}
          />
        </div>
        <StatsComponent stats={stats} />
      </div>
      <div className="column">
        <Answer attempts={attempts} correctAnswer={correctAnswer} />
      </div>
      {/* <AudioElements notesObj={acoustic_grand_piano} /> */}
    </div>
  );
}

const Answer = ({
  attempts,
  correctAnswer,
}: {
  attempts: number;
  correctAnswer?: string;
}) => {
  return correctAnswer ? (
    <>{attempts > 0 && "correctAnswer: " + correctAnswer}</>
  ) : null;
};

const StatsComponent = ({ stats: { correct, total } }: { stats: Stats }) => {
  const percentCorrect = Math.round((correct / total) * 100);

  return total > 0 ? (
    <>
      {correct}/{total}, {percentCorrect}% correct
    </>
  ) : null;
};

export default App;
