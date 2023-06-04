import React from "react";
import { useAtom } from "jotai";
import {
  settingsAscendingState,
  settingsDelayState,
  settingsDescendingState,
  settingsIntervalsSelectionState,
  settingsModeState,
} from "./state";
import type { IntervalShortName } from "./intervals";

//react component to allow user to select different options
export function Options() {
  const [settingsAscending, setSettingsAscending] = useAtom(
    settingsAscendingState
  );
  const [settingsDescending, setSettingsDescending] = useAtom(
    settingsDescendingState
  );
  const [settingsDelay, setSettingsDelay] = useAtom(settingsDelayState);
  const [settingsIntervalSelection, setSettingsIntervalSelection] = useAtom(
    settingsIntervalsSelectionState
  );

  const [settingsMode, setSettingsMode] = useAtom(settingsModeState);

  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <button
        className="button is-white"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="h2">Settings {expanded ? "▲" : "▼"}</h2>
      </button>
      <div
        style={{
          maxHeight: expanded ? 1000 : 0,
          overflow: "hidden",
          transition: "300ms all",
        }}
      >
        <fieldset>
          <h3>Mode</h3>
          <label>
            <input
              type="radio"
              name="mode"
              id="interval"
              value="interval"
              checked={settingsMode === "interval"}
              onChange={(e) => {
                setSettingsMode(e.target.value);
              }}
            />{" "}
            Interval
          </label>{" "}
          <label>
            <input
              type="radio"
              name="mode"
              id="chord"
              value="chord"
              checked={settingsMode === "chord"}
              onChange={(e) => {
                setSettingsMode(e.target.value);
              }}
            />{" "}
            Chord
          </label>
        </fieldset>
        <div className="field">
          <label className="label" htmlFor="delay">
            Delay ({settingsDelay}ms)
          </label>{" "}
          <input
            max={1000}
            min={100}
            type="range"
            name="delay"
            id="delay"
            value={settingsDelay}
            onChange={(e) => {
              setSettingsDelay(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="field">
          <label className="checkbox " htmlFor="ascending">
            <input
              type="checkbox"
              name="ascending"
              id="ascending"
              checked={settingsAscending}
              onChange={(e) => {
                setSettingsAscending(e.target.checked);
              }}
            />{" "}
            Ascending
          </label>
        </div>
        <div className="field">
          <label className="checkbox" htmlFor="descending">
            <input
              type="checkbox"
              name="descending"
              id="descending"
              checked={settingsDescending}
              onChange={(e) => {
                setSettingsDescending(e.target.checked);
              }}
            />{" "}
            Descending
          </label>
        </div>
        <div className="field">
          {Object.keys(settingsIntervalSelection).map((interval) => {
            return (
              <label key={interval}>
                <input
                  type="checkbox"
                  name={interval}
                  id={interval}
                  checked={
                    settingsIntervalSelection[interval as IntervalShortName]
                  }
                  onChange={(e) => {
                    setSettingsIntervalSelection({
                      ...settingsIntervalSelection,
                      [interval]: e.target.checked,
                    });
                  }}
                />{" "}
                {interval}{" "}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
