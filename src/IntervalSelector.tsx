import React from "react";
import { Interval, shortNameToInterval } from "./intervals";
import { settingsSelector } from "./state";
import { useRecoilValue } from "recoil";

interface IntervalSelectorProps {
  onSelect: (interval: Interval) => void;
}

export const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  onSelect,
}) => {
  const { intervalsSelection } = useRecoilValue(settingsSelector);
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
