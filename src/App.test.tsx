import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

test("renders learn react link", () => {
  expect(() => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  }).not.toThrow();
});
