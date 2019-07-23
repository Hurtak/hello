import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Text, Section, Button, InputCheckBox, SpacedItems } from "./styled";

export const SettingsDebug = view(() => {
  if (!state.debug.debugMenuVisible) return null;

  return (
    <Section title="Debug menu">
      <SpacedItems spacing={1}>
        <Text>
          This menu is visible by default in development mode or after pressing `i d d q d` cheat
          code!
        </Text>

        <InputCheckBox
          checked={state.debug.rememberSettingsOpened}
          onChange={state.debug.toggleRememberSettingsOpened}
        >
          Remember settings opened state
        </InputCheckBox>

        <Button onClick={state.debug.resetAppState}>Reset app state</Button>

        <Button onClick={state.debug.hideDebugMenu}>Hide dev menu</Button>
      </SpacedItems>
    </Section>
  );
});
