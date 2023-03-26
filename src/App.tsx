import React from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import { IntervalSelector } from "./IntervalSelector";
import { AudioElements } from "./sound";
import { acoustic_grand_piano } from "./acoustic_grand_piano";
import { statsSelector } from "./state";
import { useQuestion } from "./useQuestion";

function App() {
  const { playQuestionSound, correctAnswer, nextQuestion, guess, attempts } =
    useQuestion();

  const stats = useRecoilValue(statsSelector);

  return (
    <div className="container ">
      <button
        className="button"
        onClick={() => {
          playQuestionSound();
        }}
      >
        play again
      </button>
      <button className="button" onClick={nextQuestion}>
        next question
      </button>
      <br />
      <br />
      <br />
      <div className="columns">
        <div className="column is-one-third">
          <IntervalSelector
            onSelect={(arg) => {
              guess(arg);
              console.log(arg);
            }}
          />
        </div>
        {JSON.stringify(stats, null, 2)}
      </div>
      <div className="column">
        <Attempts attempts={attempts} correctAnswer={correctAnswer} />
      </div>
      <AudioElements notesObj={acoustic_grand_piano} />
    </div>
  );
}

const Attempts = ({
  attempts,
  correctAnswer,
}: {
  attempts: number;
  correctAnswer: string;
}) => {
  return <>{attempts > 0 && "correctAnswer: " + correctAnswer}</>;
};

export default App;
