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
        <div className="columns is-multiline is-mobile">
          {options.map((interval) => {
            return (
              <div className="column is-one-quarter ">
                <button
                  onClick={() => onSelect(interval)}
                  className="button is-info interval-button"
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
