import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Button, SpacedItems, Section } from "./styled";

export const SettingsImageSettings = view(() => {
  if (state.settings.cleanVersion) return null;

  return (
    <>
      {state.image.imageSourceWithFallback === "LOCAL" && (
        <Section title="Image settings">
          <SpacedItems horizontal>
            <Button onClick={() => state.image.shiftImageLocalIndex(-1)}>Previous</Button>
            <Button onClick={state.image.setImageLocalRandom}>Random</Button>
            <Button onClick={() => state.image.shiftImageLocalIndex(1)}>Next</Button>
          </SpacedItems>
        </Section>
      )}
    </>
  );
});
