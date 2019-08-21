import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Section, InputRadio } from "./styled";

export const SettingsViewType = view(() => {
  if (state.settings.cleanVersion) return null;

  return (
    <Section title="Widget">
      <InputRadio
        name="view"
        onChange={() => state.settings.setSelectedView("CLOCK")}
        checked={state.settings.selectedView === "CLOCK"}
      >
        Clock
      </InputRadio>

      <InputRadio
        name="view"
        onChange={() => state.settings.setSelectedView("AGE")}
        checked={state.settings.selectedView === "AGE"}
      >
        Age
      </InputRadio>

      <InputRadio
        name="view"
        onChange={() => state.settings.setSelectedView("YEAR_PROGRESS")}
        checked={state.settings.selectedView === "YEAR_PROGRESS"}
      >
        Year progress
      </InputRadio>

      <InputRadio
        name="view"
        onChange={() => state.settings.setSelectedView("NOTHING")}
        checked={state.settings.selectedView === "NOTHING"}
      >
        No thanks
      </InputRadio>
    </Section>
  );
});
