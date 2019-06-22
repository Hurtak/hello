import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { PerfTimer } from "./utils/perf-log";

const measureRender = new PerfTimer("ReactDOM.render <App />");
ReactDOM.render(<App />, document.getElementById("root"));
measureRender.measure();
