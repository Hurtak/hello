import React from "react";
import ReactDOM from "react-dom";
import { LogPerformance, logTimeElapsedSinceStart } from "./utils/logging";
import { App } from "./components/app";

logTimeElapsedSinceStart("index.tsx first line");

const performanceReactDomRender = new LogPerformance("ReactDOM.render <App />");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
performanceReactDomRender.measure();
