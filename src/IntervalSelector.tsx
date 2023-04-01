import React from "react";
import { intervals, Interval } from "./intervals";

interface IntervalSelectorProps {
  options?: Interval[];
  onSelect: (interval: Interval) => void;
}

export const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  options = intervals,
  onSelect,
}) => {
  return (
    <>
      <div className="box">
        <div className="columns is-multiline is-mobile is-variable is-1">
          {options.map((interval) => {
            return (
              <div className="column is-one-quarter buttons are-large">
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
