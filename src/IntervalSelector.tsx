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
      {/* {layout.map((row) => {
        return (
          <div className="columns is-centered is-1 is-variable">
            {row.map((intervalName) => {
              const interval = options.find(
                (interval) => interval.shortName === intervalName
              );
              if (!interval) {
                return null;
              }
              return (
                <div className="column">
                  <button
                    onClick={() => onSelect(interval)}
                    className="button interval-button "
                  >
                    {interval.longName}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })} */}
    </>
  );
};
