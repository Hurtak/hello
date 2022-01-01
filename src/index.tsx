import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { LogPerformance, logTimeElapsedSinceStart } from "./utils/logging";
import { App } from "./components/app";

logTimeElapsedSinceStart("index.tsx first line");

const performanceReactDomRender = new LogPerformance("ReactDOM.render <App />");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
performanceReactDomRender.measure();
