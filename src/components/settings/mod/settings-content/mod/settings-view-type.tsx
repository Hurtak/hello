import React from "react";
import { view } from "react-easy-state";
import { View } from "../../../../../state/mod/settings";
import { state } from "../../../../../state";
import { Section, InputRadio } from "./styled";

export const SettingsViewType = view(() => {
  if (state.settings.cleanVersion) return null;

  const views: { type: View; text: string }[] = [
    { type: "CLOCK", text: "Clock" },
    // { type: "CALENDAR", text: "Calendar" },
    { type: "AGE", text: "Age" },
    { type: "YEAR_PROGRESS", text: "Year progress" },
    { type: "NOTHING", text: "No thanks" },
  ];

  return (
    <Section title="Widget">
      {views.map(view => (
        <InputRadio
          name="view"
          onChange={() => state.settings.setSelectedView(view.type)}
          checked={state.settings.selectedView === view.type}
        >
          {view.text}
        </InputRadio>
      ))}
    </Section>
  );
});
