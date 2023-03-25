import React from "react";
import { intervals, Interval } from "./intervals";

interface IntervalSelectorProps {
  options?: Interval[];
  onSelect: (interval: Interval) => void;
}

const layout = [
  ["P1"],
  ["m2", "M2"],
  ["m3", "M3"],
  ["P4", "T", "P5"],
  ["m6", "M6"],
  ["m7", "M7"],
  ["P8"],
];

export const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  options = intervals,
  onSelect,
}) => {
  return (
    <>
      {/* {options.map((interval) => {
        return (
          <button onClick={() => onSelect(interval)}>
            {interval.longName}
          </button>
        );
      })} */}
      <div className="interval-button-container">
        {layout.map((col) => {
          return (
            <div className="interval-button-column">
              {col.map((intervalName) => {
                const interval = options.find(
                  (interval) => interval.shortName === intervalName
                );
                if (!interval) {
                  return null;
                }
                return (
                  <button onClick={() => onSelect(interval)} className="interval-button">
                    {interval.longName}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
