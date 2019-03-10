import React from "react";
import { HotKeys as ReactHotKeys } from "react-hotkeys";
import { state } from "../../state/state";

export const HotKeys: React.FC<{}> = ({ children }) => {
  return (
    <ReactHotKeys
      keyMap={{
        closeSettings: "esc"
      }}
      handlers={{
        closeSettings: state.settings.closeSettings
      }}
    >
      {children}
    </ReactHotKeys >
  );
};
