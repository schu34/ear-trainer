const getMidiNote = async (note: Note) => {
  const { acoustic_grand_piano } = await import("./acoustic_grand_piano");
  return acoustic_grand_piano[note];
};

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

const ctx = new AudioContext();

const activeSourceNodes: AudioBufferSourceNode[] = [];

function stopAllBuffers() {
  activeSourceNodes.forEach((node) => {
    try {
      node.stop();
    } catch (e) {
      console.error(e);
    }
  });
}

async function playWithDelay(notes: Note[], delay: number) {
  stopAllBuffers();
  //sometimes the context is can enter the interrupted state, so we need to
  //resume it here. Particularly a problem in Safari.
  ctx.resume();

  notes.forEach(async (note, idx) => {
    const noteData = await getMidiNote(note);
    if (!noteData) {
      throw new Error("note out of bounds");
    }
    const b = ctx.createBufferSource();
    activeSourceNodes.push(b);
    b.connect(ctx.destination);
    ctx.decodeAudioData(createBufferFromBase64(noteData)).then((buffer) => {
      b.buffer = buffer;
      b.start(ctx.currentTime + (delay * idx) / 1000);
    });
  });
}

function createBufferFromBase64(base64?: string) {
  if (!base64) {
    return new ArrayBuffer(0);
  }
  const binary = atob(base64.split("data:audio/mp3;base64,")[1]);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

export function playNotesSeq(notes: Note[], delay: number) {
  console.log("playing notes", notes, "with delay", delay);
  playWithDelay(notes, delay);
}
