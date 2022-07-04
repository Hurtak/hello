import { view } from "react-easy-state";
import { useHotkeys } from "react-hotkeys-hook";

import { state } from "../../state";

export const RootHotKeys = view(({ children }: { children: JSX.Element }) => {
  useHotkeys("esc", () => state.settings.closeSettings());
  useHotkeys("d+e+b", () => state.debug.showDebugMenu());

  return children;
});
