import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { timestampToDateInputValue } from "../../../../../utils/time";
import { eventToAgeOfBirthValues } from "./utils";
import { Section, InputCheckBox, InputDate } from "./styled";

export const SettingsViewSettings = view(() => {
  if (state.settings.cleanVersion) return null;

  return (
    <>
      {state.settings.selectedView === "CLOCK" && (
        <Section title="Clock settings">
          <InputCheckBox
            checked={state.settings.clockShowSeconds}
            onChange={state.settings.toggleClockShowSeconds}
          >
            Show seconds
          </InputCheckBox>
        </Section>
      )}

      {state.settings.selectedView === "AGE" && (
        <Section title="Age settings">
          <InputDate
            min={timestampToDateInputValue(new Date(1900, 0, 1).getTime())}
            max={timestampToDateInputValue(Date.now())}
            value={state.settings.ageDateOfBirthInputValue}
            onChange={e =>
              state.settings.setAgeDateOfBirth(eventToAgeOfBirthValues(e.target.value))
            }
          >
            Your date of birth
          </InputDate>
        </Section>
      )}
    </>
  );
});
