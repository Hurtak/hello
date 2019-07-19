import React from "react";
import { view } from "react-easy-state";
import { timestampToDateInputValue } from "../../../../utils/time";
import { state } from "../../../../state";
import { config } from "../../../../config";
import { eventToAgeOfBirthValues } from "./mod/utils";
import {
  Text,
  Heading,
  Link,
  Dash,
  List,
  ListItem,
  Warning,
  //
  Button,
  InputRadio,
  InputDate,
  InputCheckBox,
  //
  SpacedItems,
  Spacer,
  Section,
  ContactLinks,
  ContactLink,
} from "./mod/styled";

export const SettingsContent = view(() => (
  <>
    <Heading>Hello</Heading>
    {!state.settings.cleanVersion && (
      <Text>
        Welcome to your new handsome new-tab page. Enjoy a nice background from Bing every day or
        take a look at some of the fine backgrounds that I preselected. There is also a bunch of
        useful things that you can display in front of the background, like clock and stuff!
      </Text>
    )}

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

      {!state.browser.online && (
        <>
          <Spacer size={1} />
          <Warning>You are currently offline, falling back to local images</Warning>
        </>
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
    </Section>

    {state.image.imageSourceWithFallback === "LOCAL" && (
      <Section title="Image settings">
        <SpacedItems horizontal>
          <Button onClick={() => state.image.shiftImageLocalIndex(-1)}>Previous</Button>
          <Button onClick={state.image.setImageLocalRandom}>Random</Button>
          <Button onClick={() => state.image.shiftImageLocalIndex(1)}>Next</Button>
        </SpacedItems>
      </Section>
    )}

    <Section title="Image information">
      {state.image.imageSourceWithFallback === "BING" && (
        <>
          {state.image.imageBing.type === "FETCHING" && (
            <List>
              <ListItem>Fetching&hellip;</ListItem>
            </List>
          )}
          {state.image.imageBing.type === "DONE" && (
            <List>
              {state.image.imageBing.data.title && (
                <ListItem>
                  Title <Dash /> {state.image.imageBing.data.title}
                </ListItem>
              )}
              {state.image.imageBing.data.description && (
                <ListItem>
                  Description <Dash /> {state.image.imageBing.data.description}
                </ListItem>
              )}
              {state.image.imageBing.data.link && (
                <ListItem>
                  <Link href={state.image.imageBing.data.link}>Link</Link>
                </ListItem>
              )}
            </List>
          )}
        </>
      )}

      {state.image.imageSourceWithFallback === "LOCAL" && (
        <List>
          <ListItem>
            Image <Dash /> {state.image.imageLocalIndex + 1}/{state.image.imagesLocal.length}
          </ListItem>
          {state.image.imageLocal.name && (
            <ListItem>
              Name <Dash /> {state.image.imageLocal.name}
            </ListItem>
          )}
          {state.image.imageLocal.location && (
            <ListItem>
              Location <Dash /> {state.image.imageLocal.location}
            </ListItem>
          )}
          {state.image.imageLocal.source && (
            <ListItem>
              <Link href={state.image.imageLocal.source}>Source</Link>
            </ListItem>
          )}
        </List>
      )}
    </Section>

    <Section title="Useful stuff">
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
          onChange={e => state.settings.setAgeDateOfBirth(eventToAgeOfBirthValues(e.target.value))}
        >
          Your date of birth
        </InputDate>
      </Section>
    )}

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

    {!state.settings.cleanVersion && (
      <Section title="Who did this?">
        <Text>
          I did! If you find any bugs or if you would like to tell me how much you like this swell
          plugin you can do that. Also, this plugin is open-source, so you contribute on GitHub!
        </Text>

        <ContactLinks>
          <SpacedItems spacing={2} horizontal>
            <ContactLink iconType="GITHUB" href="https://github.com/hurtak/hello-friend">
              Github
            </ContactLink>
            <ContactLink iconType="TWITTER" href="https://twitter.com/PetrHurtak">
              Twitter
            </ContactLink>
            <ContactLink iconType="MAIL" href="mailto:petr.hurtak@gmail.com">
              Mail
            </ContactLink>
          </SpacedItems>
        </ContactLinks>
      </Section>
    )}

    {config.isDev && (
      <Section title="Dev menu">
        <Text>This menu is only visible in development mode</Text>
        <Button onClick={state.debug.resetAppState}>Reset app state</Button>

        <InputCheckBox
          checked={state.debug.rememberSettingsOpened}
          onChange={state.debug.toggleRememberSettingsOpened}
        >
          Remember settings opened state
        </InputCheckBox>
      </Section>
    )}
  </>
));
