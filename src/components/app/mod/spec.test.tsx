import { createRoot } from "react-dom/client";

import { App } from "../";

test("renders without crashing", () => {
  createRoot(document.createElement("div")).render(<App />);
});
