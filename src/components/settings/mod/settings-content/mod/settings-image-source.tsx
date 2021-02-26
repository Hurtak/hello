import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Warning, InputRadio, Spacer, Section } from "./styled";

export const SettingsImageSource = view(() => {
  if (state.settings.cleanVersion) return <Errors />;

  return (
    <Section title="Image source">
      <InputRadio
        name="images"
        onChange={() => state.image.setImageSource("BING")}
        checked={state.image.imageSourceWithFallback === "BING"}
        disabled={state.browser.online === false}
      >
        Bing image of the day
      </InputRadio>

      <InputRadio
        name="images"
        onChange={() => state.image.setImageSource("LOCAL")}
        checked={state.image.imageSourceWithFallback === "LOCAL"}
      >
        Local
      </InputRadio>

      <Errors />
    </Section>
  );
});

const Errors = view(() => {
  return (
    <>
      {!state.browser.online && (
        <>
          <Spacer />
          <Warning>You are currently offline, falling back to local images.</Warning>
        </>
      )}
      {state.browser.online && state.image.imageBing.type === "ERROR" && (
        <>
          <Spacer />
          <Warning>Error fetching the Bing image ({state.image.imageBing.errorType})</Warning>
        </>
      )}
    </>
  );
});
