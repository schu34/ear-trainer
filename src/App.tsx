import React from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import { IntervalSelector } from "./IntervalSelector";
import { AudioElements } from "./sound";
import { acoustic_grand_piano } from "./acoustic_grand_piano";
import { statsSelector } from "./state";
import { useQuestion } from "./useQuestion";

function App() {
  const { playQuestionSound, correctAnswer, nextQuestion, guess } =
    useQuestion();

  const stats = useRecoilValue(statsSelector);

  return (
    <div className="App">
      <button
        onClick={() => {
          playQuestionSound();
        }}
      >
        play again
      </button>
      <button onClick={nextQuestion}>next question</button>
      <IntervalSelector
        onSelect={(arg) => {
          guess(arg);
          console.log(arg);
        }}
      />
      correctAnswer: {correctAnswer}
      <br></br>
      <br></br>
      {JSON.stringify(stats, null, 2)}
      <AudioElements notesObj={acoustic_grand_piano} />
    </div>
  );
}

export default App;
