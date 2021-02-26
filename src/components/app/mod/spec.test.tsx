import React from "react";
import ReactDOM from "react-dom";
import { App } from "../";

test("renders without crashing", () => {
  ReactDOM.render(<App />, document.createElement("div"));
});
