import React from "react";
import { useAtom } from "jotai";
import { Interval, shortNameToInterval } from "./intervals";
import { settingsSelector } from "./state";
import { Chord, shortNameToChord } from "./chord";

interface ChordSelectorProps {
  onSelect: (chord: Chord) => void;
}

export const ChordSelector: React.FC<ChordSelectorProps> = ({ onSelect }) => {
  const [{ chordSelection }] = useAtom(settingsSelector);
  return (
    <>
      <div className="box">
        <div className="columns is-multiline is-mobile is-variable is-1">
          {chordSelection.map((shortname) => {
            const chord = shortNameToChord[shortname];
            return (
              <div
                className="column is-one-quarter buttons are-large"
                key={chord.shortName}
              >
                <button
                  onClick={() => onSelect(chord)}
                  className="button is-info interval-button is-fullwidth"
                >
                  {chord.shortName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface IntervalSelectorProps {
  onSelect: (interval: Interval) => void;
}

export const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  onSelect,
}) => {
  const [{ intervalsSelection }] = useAtom(settingsSelector);
  return (
    <>
      <div className="box">
        <div className="columns is-multiline is-mobile is-variable is-1">
          {intervalsSelection.map((shortname) => {
            const interval = shortNameToInterval[shortname];
            return (
              <div
                className="column is-one-quarter buttons are-large"
                key={interval.shortName}
              >
                <button
                  onClick={() => onSelect(interval)}
                  className="button is-info interval-button is-fullwidth"
                >
                  {interval.shortName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
