import React from "react";
import { view } from "@risingstack/react-easy-state";
import { version } from "../../../../../../package.json";
import { state } from "../../../../../state";
import { Text, Section, Button, InputCheckBox, SpacedItems, List, ListItem, Dash } from "./styled";

const buildTimeTimestamp = process.env.REACT_APP_BUILD_TIME
  ? Number(process.env.REACT_APP_BUILD_TIME) * 1000
  : Date.now();

export const SettingsDebug = view(() => {
  if (!state.debug.debugMenuVisible) return null;

  return (
    <Section title="Debug menu">
      <SpacedItems spacing={1}>
        <Text>
          This menu is visible by default in development mode or after pressing `d+e+b` cheat code.
        </Text>

        <List>
          <ListItem>
            Version <Dash /> {version}
          </ListItem>
          <ListItem>
            Build time <Dash /> {new Date(buildTimeTimestamp).toISOString()}
          </ListItem>
        </List>

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
