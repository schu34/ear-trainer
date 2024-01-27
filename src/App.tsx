import React from "react";
import { useAtom } from "jotai";
import "./App.css";
import { ChordSelector, IntervalSelector } from "./IntervalSelector";
import { statsSelector, Stats, settingsModeState } from "./state";
import { useQuestion } from "./useQuestion";
import { Options } from "./options";

function App() {
  const { guess } = useQuestion();

  const [stats] = useAtom(statsSelector);

  const [mode] = useAtom(settingsModeState);

  return (
    <div className="container ">
      <div className="title">Interval Trainer</div>
      <div className="columns">
        <div className="column">
          <Options />
        </div>
        <Controls />
      </div>
      <div className="columns">
        <div className="column is-one-third">
          {mode === "interval" ? (
            <IntervalSelector onSelect={guess} />
          ) : (
            <ChordSelector onSelect={guess} />
          )}
        </div>
        <StatsComponent stats={stats} />
      </div>
      <div className="column">
        <Answer />
      </div>
    </div>
  );
}

const Controls = () => {
  const { playQuestionSound, correctAnswer, nextQuestion } = useQuestion();
  return (
    <div className="column is-one-third">
      <div className="columns is-mobile">
        <div className="column is-fluid">
          {correctAnswer && (
            <button
              className="button is-primary control-button"
              onClick={() => {
                playQuestionSound();
              }}
            >
              Play Again
            </button>
          )}
        </div>
        <div className="column">
          <button className="button control-button" onClick={nextQuestion}>
            {correctAnswer ? "Next Question" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};
const Answer = () => {
  const { attempts, correctAnswer } = useQuestion();
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
