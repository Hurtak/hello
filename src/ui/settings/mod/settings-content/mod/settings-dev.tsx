import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { config } from "../../../../../config";
import { Text, Section, Button, InputCheckBox, Spacer } from "./styled";

export const SettingsDev = view(() => {
  if (!config.isDev) return null;

  return (
    <Section title="Dev menu">
      <Text>This menu is only visible in development mode</Text>

      <Spacer size={0.5} />

      <Button onClick={state.debug.resetAppState}>Reset app state</Button>

      <Spacer size={0.5} />

      <InputCheckBox
        checked={state.debug.rememberSettingsOpened}
        onChange={state.debug.toggleRememberSettingsOpened}
      >
        Remember settings opened state
      </InputCheckBox>
    </Section>
  );
});
