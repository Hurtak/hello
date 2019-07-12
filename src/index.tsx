import React from "react";
import ReactDOM from "react-dom";
import { LogPerformance, logTimeElapsedSinceStart } from "./utils/logging";
import { App } from "./ui/app";

logTimeElapsedSinceStart("index.tsx first line");

const measureRender = new LogPerformance("ReactDOM.render <App />");
ReactDOM.render(<App />, document.getElementById("root"));
measureRender.measure();
