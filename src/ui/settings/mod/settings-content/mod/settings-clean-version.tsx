import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Text, Section, InputCheckBox } from "./styled";

export const SettingsCleanVersion = view(() => (
  <Section title="Clean version">
    {!state.settings.cleanVersion && (
      <Text>
        Settings button will be hidden unless you hover him. Also bunch of useless text, like this
        paragraph, will be hidden. Nice.
      </Text>
    )}

    <InputCheckBox
      checked={state.settings.cleanVersion}
      onChange={state.settings.toggleCleanVersion}
    >
      No fluff
    </InputCheckBox>
  </Section>
));
