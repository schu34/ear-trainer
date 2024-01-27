import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders without errors", () => {
  expect(() => {
    render(<App />);
  }).not.toThrow();
});

test("renders the correct content", () => {
  render(<App />);
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.queryByText("Play Again")).not.toBeInTheDocument();
});
