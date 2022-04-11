import { createRoot } from "react-dom/client";

import { LogPerformance, logTimeElapsedSinceStart } from "./utils/logging";
import { App } from "./components/app";

logTimeElapsedSinceStart("index.tsx first line");

const container = document.getElementById("root");
if (container) {
  const performanceReactDomRender = new LogPerformance("ReactDOM.render <App />");
  const root = createRoot(container);
  root.render(<App />);
  performanceReactDomRender.measure();
} else {
  throw new Error("Root element, where we want to render the React app, not found");
}
