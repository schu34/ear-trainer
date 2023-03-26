import { render, screen } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

test("renders without errors", () => {
  expect(() => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  }).not.toThrow();
});

test("renders the correct content", () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  expect(screen.getByText("play again")).toBeInTheDocument();
  expect(screen.getByText("next question")).toBeInTheDocument();
});