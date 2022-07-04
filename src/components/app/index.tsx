import "wicg-inert"; // TODO: Remove once supported in Chrome & FF

import { useEffect, useRef, useState } from "react";
import { view } from "react-easy-state";

import { config } from "../../config";
import { state } from "../../state";
import { GlobalStyles } from "../../styles";
import { logTimeElapsedSinceStart, logTimestamp } from "../../utils/logging";
import { never } from "../../utils/never";
import * as time from "../../utils/time";
import { BackgroundImage } from "../background-image";
import { RootHotKeys } from "../hotkeys/hotkeys";
import { Settings } from "../settings";
import { TimerUpdater } from "../utils/timer-updater";
import { Age } from "../widgets/age";
import { Calendar } from "../widgets/calendar";
import { Clock } from "../widgets/clock";
import { YearProgress } from "../widgets/year-progress";
import {
  AppContent,
  AppSettings,
  AppSettingsInner,
  AppSettingsLayout,
  BackgroundWrapper,
  Layout,
} from "./mod/styled";

export const App = view(() => {
  useEffect(() => {
    void state.app.initialize();
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
