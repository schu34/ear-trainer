type NoteName =
  | "Ab"
  | "A"
  | "A#"
  | "Bb"
  | "B"
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#";

type Octave = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Note = `${NoteName}${Octave}`;

export type Chord = Note[];

export type SequenceStep = {
  notes: Chord;
  delay: number;
};

export type Sequence = SequenceStep[];

export function playNote(note: Note) {
  console.log("playing", note);
  const elem = document.querySelector("#" + note);
  if (elem instanceof HTMLAudioElement) {
    if (elem.paused) {
      elem.play();
    } else {
      elem.currentTime = 0;
    }
  }
}

// export function chord(notes: Note[]): SequenceStep {
//   return n
// }

export function makeSeq(
  steps: (Note | Chord)[],
  delay: number
): SequenceStep[] {
  return steps.map((step, i) => ({
    notes: Array.isArray(step) ? step : [step],
    delay: i * delay,
  }));
}

export function makeInterval(notes: [Note,Note], delay: number):[SequenceStep,SequenceStep] {
  return makeSeq(notes, delay) as [SequenceStep,SequenceStep];
}

export function makeChord(notes: Chord, delay: number): SequenceStep {
  return { notes, delay };
}


function playWithDelay(notes: Note[], delay: number) {
  return setTimeout(() => {
    stopAllSounds();
    return notes.forEach(playNote);
  }, delay);
}

export function playSequence(seq: Sequence) {
  // we have to coerce this because as far as TS is concerned this is still just
  // a Sequence, but we're assuming 10 levels of flattening is sufficient to
  // remove any nested arrays
  const intervals = seq // 10 should be plenty, but we can always raise this if needed
    .map(({ notes, delay }) => {
      const noteArr = Array.isArray(notes) ? notes : [notes];
      return playWithDelay(noteArr, delay);
    });
  return () => intervals.forEach(clearInterval);
}

export function playNotesSeq(notes: Note[], delay: number) {
  console.log("playing notes", notes, "with delay", delay);
  notes.forEach((note, i) => {
    setTimeout(() => {
      playNote(note);
    }, delay * i);
  });
}

export function stopAllSounds() {
  document.querySelectorAll(".audio-el").forEach((elem) => {
    if (elem instanceof HTMLAudioElement) {
      elem.pause();
      elem.currentTime = 0;
    }
  });
}

type AudioElementsProps = {
  notesObj: {
    [key in Note]?: string;
  };
};

export const AudioElements: React.FC<AudioElementsProps> = ({ notesObj }) => {
  return (
    <div>
      {Object.entries(notesObj).map(([key, value]) => {
        return <audio className="audio-el" src={value} id={key}></audio>;
      })}
    </div>
  );
};
