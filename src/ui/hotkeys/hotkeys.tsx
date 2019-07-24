import React from "react";
import { view } from "react-easy-state";
import { HotKeys } from "react-hotkeys";
import { state } from "../../state";

export const RootHotKeys = view(({ children }) => {
  return (
    <HotKeys
      keyMap={{
        CLOSE_SETTINGS: "esc",
        SHOW_DEBUG_MENU: ["i d d q d"],
      }}
      handlers={{
        CLOSE_SETTINGS: state.settings.closeSettings,
        SHOW_DEBUG_MENU: state.debug.showDebugMenu,
      }}
    >
      {children}
    </HotKeys>
  );
});