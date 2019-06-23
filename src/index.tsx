import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { LogPerformance } from "./utils/logging";

const measureRender = new LogPerformance("ReactDOM.render <App />");
ReactDOM.render(<App />, document.getElementById("root"));
measureRender.measure();
