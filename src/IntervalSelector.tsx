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
      <div className="columns is-multiline is-mobile">
        {options.map((interval) => {
          return (
            <div className="column is-half">
              <button onClick={() => onSelect(interval)} className="button">
                {interval.longName}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
