import React from "react";
import { view } from "react-easy-state";
import OutsideClickHandler from "react-outside-click-handler";
import {
  SettingsWrapper,
  ToggleButton,
  ToggleButtonIconWrapper,
  ToggleButtonSpacer,
} from "./styled";
import { Heading, Text, Warning, Radio, Checkbox, Section } from "./components";
import { eventToAgeOfBirthValues } from "./utils";
import * as s from "../../styles/styles";
import { state } from "../../state/state";
import { timestampToDateInputValue } from "../../utils/time";
import { IconCog } from "../../icons";

type SettingsProps = {
  isDev: boolean;
};

export const Settings = view((props: SettingsProps) => (
  <OutsideClickHandler onOutsideClick={state.settings.closeSettings}>
    <SettingsWrapper settingsHidden={state.settings.cleanVersion && !state.settings.opened}>
      <ToggleButton onClick={state.settings.toggleSettingsOpened}>
        <ToggleButtonIconWrapper rotated={state.settings.opened}>
          <IconCog
            width={s.pxToGrid(s.dimensions.settingsButtonSize)}
            height={s.pxToGrid(s.dimensions.settingsButtonSize)}
          />
        </ToggleButtonIconWrapper>
      </ToggleButton>

      <ToggleButtonSpacer />

      <div inert={state.settings.opened === false ? "inert" : null}>
        <SettingsContent isDev={props.isDev} />
      </div>
    </SettingsWrapper>
  </OutsideClickHandler>
));

const SettingsContent = view((props: SettingsProps) => (
  <>
    <Heading>Hello</Heading>
    {!state.settings.cleanVersion && (
      <Text>
        Welcome to your new handsome new-tab page. Enjoy a nice background from Bing every day or
        take a look at some of the fine backgrounds that I preselected. There is also a bunch of
        useful things that you can display in front of the background, like clock and stuff!
      </Text>
    )}

    <Section title="Background image">
      {!state.browser.online && (
        <Warning>You are currently offline, falling back to local images</Warning>
      )}
      {state.image.imageBing.type === "ERROR" && (
        <>
          {/* TODO: proper error matching */}
          <p>Error</p>
          <p>errorType: {state.image.imageBing.errorType}</p>
          <p>errorData: {String(state.image.imageBing.data)}</p>
          <pre>
            <code>{JSON.stringify(state.image.imageBing)}</code>
          </pre>
        </>
      )}

      <Radio
        name="images"
        onChange={() => state.image.setImageSource("BING")}
        checked={state.image.imageSourceWithFallback === "BING"}
        disabled={state.browser.online === false}
      >
        Bing image of the day
      </Radio>

      <Radio
        name="images"
        onChange={() => state.image.setImageSource("LOCAL")}
        checked={state.image.imageSourceWithFallback === "LOCAL"}
      >
        Predefined
      </Radio>

      {state.image.imageSourceWithFallback === "BING" && state.image.imageBing.type === "DONE" && (
        <section>
          {state.image.imageBing.data.title && (
            <Text>title: {state.image.imageBing.data.title}</Text>
          )}
          {state.image.imageBing.data.description && (
            <Text>description: {state.image.imageBing.data.description}</Text>
          )}
          {state.image.imageBing.data.link && (
            <Text>
              <a href={state.image.imageBing.data.link}>link</a>
            </Text>
          )}
        </section>
      )}

      {state.image.imageSourceWithFallback === "LOCAL" && (
        <section>
          <button onClick={() => state.image.shiftImageLocalIndex(-1)}>Prev</button>
          <button onClick={state.image.setImageLocalRandom}>Random image</button>
          <button onClick={() => state.image.shiftImageLocalIndex(1)}>Next</button>

          {(() => {
            const image = state.image.imageLocal;

            return (
              <>
                <Text>
                  image: {state.image.imageLocalIndex + 1}/{state.image.imagesLocal.length}
                </Text>
                {image.name && <Text>name: {image.name}</Text>}
                {image.location && <Text>location: {image.location}</Text>}
                {image.source && (
                  <Text>
                    <a href={image.source}>source</a>
                  </Text>
                )}
              </>
            );
          })()}
        </section>
      )}
    </Section>

    <Section title="Useful stuff">
      <Radio
        name="view"
        onChange={() => state.settings.setSelectedView("CLOCK")}
        checked={state.settings.selectedView === "CLOCK"}
      >
        Clock
      </Radio>

      <Radio
        name="view"
        onChange={() => state.settings.setSelectedView("AGE")}
        checked={state.settings.selectedView === "AGE"}
      >
        Age
      </Radio>

      <Radio
        name="view"
        onChange={() => state.settings.setSelectedView("YEAR_PROGRESS")}
        checked={state.settings.selectedView === "YEAR_PROGRESS"}
      >
        Year progress
      </Radio>

      <Radio
        name="view"
        onChange={() => state.settings.setSelectedView("NOTHING")}
        checked={state.settings.selectedView === "NOTHING"}
      >
        No thanks
      </Radio>

      {state.settings.selectedView === "CLOCK" && (
        <Checkbox
          checked={state.settings.clockShowSeconds}
          onChange={state.settings.toggleClockShowSeconds}
        >
          Show seconds
        </Checkbox>
      )}

      {state.settings.selectedView === "AGE" && (
        <label>
          Your date of birth
          <input
            type="date"
            min={timestampToDateInputValue(new Date(1900, 0, 1).getTime())}
            max={timestampToDateInputValue(Date.now())}
            value={state.settings.ageDateOfBirthInputValue}
            onChange={e => state.settings.setAgeDateOfBirth(eventToAgeOfBirthValues(e))}
          />
        </label>
      )}
    </Section>

    <Section title="Clean version">
      {!state.settings.cleanVersion && (
        <Text>
          Settings button will be hidden unless you hover him. Also bunch of useless text, like this
          paragraph, will be hidden. Nice.
        </Text>
      )}
      <Checkbox
        checked={state.settings.cleanVersion}
        onChange={state.settings.toggleMinimalistVersion}
      >
        No fluff
      </Checkbox>
    </Section>

    {!state.settings.cleanVersion && (
      <Section title="Who did this?">
        <Text>
          I did! If you find any bugs or if you would like to tell me how much you like this swell
          plugin you can do that. Also, this plugin is open-source, so you contribute on GitHub!
        </Text>

        <a href="https://github.com/hurtak/hello-friend">Github</a>
        <a href="https://twitter.com/PetrHurtak">Twitter</a>
        <a href="mailto:petr.hurtak@gmail.com">Mail</a>
      </Section>
    )}

    {props.isDev && (
      <Section title="Dev menu">
        <Text>This menu is only visible in development mode</Text>
        <button onClick={state.settings.resetAppState}>Reset app state</button>
      </Section>
    )}
  </>
));
