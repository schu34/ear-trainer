import React from "react";
import { useRecoilState } from "recoil";
import {
  settingsAscendingState,
  settingsDelayState,
  settingsDescendingState,
  settingsIntervalsSelectionState,
  settingsModeState,
} from "./state";

//react component to allow user to select different options
export function Options() {
  const [settingsMode, setSettingsModel] = useRecoilState(settingsModeState);
  const [settingsAscending, setSettingsAscending] = useRecoilState(
    settingsAscendingState
  );
  const [settingsDescending, setSettingsDescending] = useRecoilState(
    settingsDescendingState
  );
  const [settingsDelay, setSettingsDelay] = useRecoilState(settingsDelayState);
  const [settingsIntervalSelection, setSettingsIntervalSelection] =
    useRecoilState(settingsIntervalsSelectionState);
  return (
    <div>
      <div>
        {/* <fieldset>
				<h3>Mode</h3>
        <input
          type="radio"
          name="mode"
          id="interval"
          value="interval"
          checked={settingsMode === "interval"}
        />{" "}
        <label>Interval</label>
        <input type="radio" name="mode" id="chord" value="chord" checked={settingsMode === "chord"}/>
      </fieldset> */}
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
          <label>
            <input type="checkbox" name="p1" id="p1" checked={settingsIntervalSelection[p1]}></input>
          </label>
        </div>
      </div>
    </div>
  );
}
