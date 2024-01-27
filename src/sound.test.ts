import { allNotes, minNote, maxNote } from "./sound";

describe("sound", () => {
  it("should get the correct set of notes", () => {
    expect(allNotes[0]).toEqual(minNote);
    expect(allNotes[allNotes.length - 1]).toEqual(maxNote);
  });
});
