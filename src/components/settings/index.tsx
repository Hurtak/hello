import React from "react";
import { view } from "react-easy-state";
import OutsideClickHandler from 'react-outside-click-handler';
import {
  SettingsWrapper,
  ToggleButton,
  ToggleButtonIconWrapper,
  ToggleButtonSpacer,
  Heading,
  Text,
  SettingsSectionsWrapper,
  SettingsSectionStyled,
  HeadingSmall,
  RadioLabel,
  RadioText,
  Warning
} from "./styled";
import { eventToAgeOfBirthValues } from "./utils";
import { IconCog } from "../icon";
import * as s from "../../styles/styles";
import { state } from "../../state/state";
import { timestampToDateInputValue } from "../../shared/time";

type SettingsProps = {
  isDev: boolean;
};

export const Settings = view((props: SettingsProps) => (
  <OutsideClickHandler onOutsideClick={state.settings.closeSettings}>
    <SettingsWrapper
      settingsHidden={state.settings.settingsHidden && !state.settings.opened}
    >
      <ToggleButton onClick={state.settings.toggleSettingsOpened}>
        <ToggleButtonIconWrapper rotated={state.settings.opened}>
          <IconCog
            width={s.dimensions.settingsButtonSize}
            height={s.dimensions.settingsButtonSize}
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

// React.memo used to prevent rerendering of whole menu when menuOpened state
// changes in parent component
// TODO: might not be needed after we chagned state library?
const SettingsContent = view((props: SettingsProps) => (
  <>
    <Heading>Hello Friend &ndash; New Tab Page</Heading>
    <Text>
      This is your new cool new tab page. Enjoy a nice background from Bing
      every day or have a look at some nice background that I preselected. There
      is also a bunch of useful that you can display in front of the background,
      like clock and stuff!
    </Text>

    <SettingsSectionsWrapper>
      <SettingsSection title="Background image">
        {!state.browser.online && (
          <Warning>
            You are currently offline, falling back to local images
          </Warning>
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

        {state.image.imageSourceWithFallback === "BING" &&
          state.image.imageBing.type === "DONE" && (
            <section>
              {state.image.imageBing.data.title && (
                <Text>title: {state.image.imageBing.data.title}</Text>
              )}
              {state.image.imageBing.data.description && (
                <Text>
                  description: {state.image.imageBing.data.description}
                </Text>
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
            <button onClick={() => state.image.shiftImageLocalIndex(-1)}>
              Prev
            </button>
            <button onClick={state.image.setImageLocalRandom}>
              Random image
            </button>
            <button onClick={() => state.image.shiftImageLocalIndex(1)}>
              Next
            </button>

            {(() => {
              const image = state.image.imageLocal;

              return (
                <>
                  <Text>
                    image: {state.image.imageLocalIndex + 1}/
                    {state.image.imagesLocal.length}
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
      </SettingsSection>

      <SettingsSection title="View type">
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
          onChange={() => state.settings.setSelectedView("NOTHING")}
          checked={state.settings.selectedView === "NOTHING"}
        >
          Nothing
        </Radio>

        {state.settings.selectedView === "CLOCK" && (
          <label>
            <Text>
              <input
                type="checkbox"
                checked={state.settings.clockShowSeconds}
                onChange={state.settings.toggleClockShowSeconds}
              />
              Show seconds
            </Text>
          </label>
        )}

        {state.settings.selectedView === "AGE" && (
          <label>
            Your date of birth
            <input
              type="date"
              min={timestampToDateInputValue(Date.UTC(1900, 0, 1))}
              max={timestampToDateInputValue(Date.now())}
              value={state.settings.ageDateOfBirthInputValue}
              onChange={e =>
                state.settings.setAgeDateOfBirth(eventToAgeOfBirthValues(e))
              }
            />
          </label>
        )}
      </SettingsSection>

      <SettingsSection title="Minimalistic version">
        <Text>
          Settings button will be hidden unless you hover the mouse over the
          area where the button is. Also bunch of useless text (like this
          paragraph) will be hidden.
        </Text>
        <label>
          <input
            type="checkbox"
            checked={state.settings.settingsHidden}
            onChange={state.settings.toggleSettingsHidden}
          />
          Hide stuff
        </label>
      </SettingsSection>

      <SettingsSection title="Contact">
        <Text>
          If you find any bugs or if you would like to tell me how much you like
          this swell plugin you can do so on following channels. Also this
          plugin is open source, so you contribute on GitHub!
        </Text>
        <a href="https://github.com/hurtak/hello-friend">Github</a>
        <a href="https://twitter.com/PetrHurtak">Twitter</a>
        <a href="mailto:petr.hurtak@gmail.com">Mail</a>
      </SettingsSection>

      {props.isDev && (
        <SettingsSection title="Dev menu">
          <Text>This menu is only visible in development mode</Text>
          <button onClick={state.settings.resetAppState}>
            Reset app state
          </button>
        </SettingsSection>
      )}
    </SettingsSectionsWrapper>
  </>
));

const SettingsSection: React.FC<{
  title: string;
}> = props => (
  <SettingsSectionStyled>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </SettingsSectionStyled>
);

const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = props => (
  <RadioLabel>
    <input
      type="radio"
      name={props.name}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    />
    <RadioText>{props.children}</RadioText>
  </RadioLabel>
);
