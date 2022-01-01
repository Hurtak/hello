import "wicg-inert"; // TODO: Remove once supported in Chrome & FF
import "focus-visible"; // TODO: Remove once supported in Chrome & FF

import { useState, useEffect, useRef } from "react";
import { view } from "react-easy-state";

import { state } from "../../state";
import * as time from "../../utils/time";
import { TimerUpdater } from "../utils/timer-updater";
import { logTimeElapsedSinceStart, logTimestamp } from "../../utils/logging";
import { never } from "../../utils/never";
import { GlobalStyles } from "../../styles";
import { config } from "../../config";
import { Clock } from "../widgets/clock";
import { Age } from "../widgets/age";
import { Calendar } from "../widgets/calendar";
import { YearProgress } from "../widgets/year-progress";
import { Settings } from "../settings";
import { BackgroundImage } from "../background-image";
import { RootHotKeys } from "../hotkeys/hotkeys";
import {
  Layout,
  BackgroundWrapper,
  AppContent,
  AppSettingsLayout,
  AppSettings,
  AppSettingsInner,
} from "./mod/styled";

export const App = view(() => {
  useEffect(() => {
    state.app.initialize();
  }, []);

  useEffect(() => {
    if (state.app.initialized) {
      logTimeElapsedSinceStart("Full App Render", true);
    } else {
      logTimestamp("First empty render");
    }
  });

  if (!state.app.initialized) {
    return null;
  }

  return (
    <RootHotKeys>
      <Layout>
        <GlobalStyles />
        <AppInner />
      </Layout>
    </RootHotKeys>
  );
});

const AppInner = view(() => {
  const settingsEl = useRef<HTMLDivElement>(null);
  const [settingsHeight, setSettingsHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!settingsEl.current) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      setSettingsHeight(entries[0].contentRect.height);
    });
    observer.observe(settingsEl.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackgroundWrapper>
        <BackgroundImage url={state.image.imageUrl} />
      </BackgroundWrapper>

      {/* TODO: AFAIK TimerUpdated dod not handle well view change and its updateEveryN change,
          so we pu key on AppContent, investigate */}
      <AppContent key={state.settings.selectedView}>
        {(() => {
          switch (state.settings.selectedView) {
            case "CLOCK":
              return (
                <TimerUpdater
                  updateEveryN={state.settings.clockShowSeconds ? time.secondMs : time.minuteMs}
                  component={(time) => (
                    <Clock time={time} showSeconds={state.settings.clockShowSeconds} />
                  )}
                />
              );

            case "CALENDAR":
              return (
                <TimerUpdater
                  updateEveryN={time.dayMs}
                  component={(time) => <Calendar time={time} />}
                  key={state.settings.selectedView}
                />
              );

            case "YEAR_PROGRESS":
              return (
                <TimerUpdater
                  updateEveryN={time.yearMs / 100 / 10 ** config.yearProgressDecimalPlaces}
                  component={(time) => (
                    <YearProgress time={time} decimalPlaces={config.yearProgressDecimalPlaces} />
                  )}
                />
              );

            case "AGE":
              return (
                <TimerUpdater
                  updateEveryN={time.yearMs / 10 ** config.ageDecimalPlaces}
                  component={(time) => (
                    <Age
                      time={time}
                      birthDate={state.settings.ageDateOfBirthTimestamp}
                      decimalPlaces={config.ageDecimalPlaces}
                    />
                  )}
                />
              );

            case "NOTHING":
              return null;

            default:
              never(state.settings.selectedView);
          }
        })()}
      </AppContent>

      <AppSettingsLayout>
        <AppSettings opened={state.settings.opened} contentHeight={settingsHeight}>
          <AppSettingsInner ref={settingsEl}>
            <Settings />
          </AppSettingsInner>
        </AppSettings>
      </AppSettingsLayout>
    </>
  );
});
