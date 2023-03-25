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
      {options.map((interval) => {
        return (
          <button onClick={() => onSelect(interval)}>
            {interval.longName}
          </button>
        );
      })}
    </>
  );
};
