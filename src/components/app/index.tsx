import React, { useState, useEffect, useRef } from "react";
import { view } from "react-easy-state";
import { HotKeys } from "react-hotkeys";
import ResizeObserver from "resize-observer-polyfill"; // TODO: Remove once supported in Chrome & FF
import "wicg-inert"; // TODO: Remove once supported in Chrome & FF

import { Layout, BackgroundWrapper, AppContent, AppSettingsWrapper, AppSettings } from "./styled";
import { Settings } from "../settings";
import { BackgroundImage } from "../background-image";
import { TimerUpdater } from "../timer-updater";
import { Clock } from "../pages/clock";
import { Age } from "../pages/age";
import { YearProgress } from "../pages/year-progress";
import { state } from "../../state/state";
import * as time from "../../utils/time";
import { logTimeElapsedSinceStart } from "../../utils/logging";
import { GlobalStyles } from "../../styles/global-styles";
import { config } from "../../config";

export const App = view(() => {
  useEffect(() => {
    state.app.initialize();
    return () => state.app.destroy();
  }, []);

  useEffect(() => {
    if (state.app.initialized) {
      logTimeElapsedSinceStart("Full App Render");
    }
  });

  return (
    <HotKeys
      keyMap={{
        CLOSE_SETTINGS: "esc",
      }}
      handlers={{
        CLOSE_SETTINGS: state.settings.closeSettings,
      }}
    >
      <Layout>
        <GlobalStyles />

        {state.app.initialized && <AppInner />}
      </Layout>
    </HotKeys>
  );
});

const AppInner = view(() => {
  const settingsEl = useRef<HTMLDivElement>(null);
  const [settingsHeight, setSettingsHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!settingsEl.current) return;

    const observer = new ResizeObserver(entries => {
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

      <AppContent key={state.settings.selectedView}>
        {(() => {
          switch (state.settings.selectedView) {
            case "CLOCK":
              return (
                <TimerUpdater
                  updateEveryN={state.settings.clockShowSeconds ? time.second : time.minute}
                  component={time => (
                    <Clock time={time} showSeconds={state.settings.clockShowSeconds} />
                  )}
                />
              );

            // case "CALENDAR":
            //   return (
            //       <TimerUpdater
            //         updateEveryN={time.day}
            //         component={time => <Calendar time={time} />}
            //         key={state.settings.selectedView}
            //       />
            //   );

            case "YEAR_PROGRESS":
              return (
                <TimerUpdater
                  updateEveryN={time.year / 100 / 10 ** config.yearProgressDecimalPlaces}
                  component={time => (
                    <YearProgress time={time} decimalPlaces={config.yearProgressDecimalPlaces} />
                  )}
                />
              );

            case "AGE":
              return (
                <TimerUpdater
                  updateEveryN={time.year / 10 ** config.ageDecimalPlaces}
                  component={time => (
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
              return null;
          }
        })()}
      </AppContent>

      <AppSettingsWrapper opened={state.settings.opened} contentHeight={settingsHeight}>
        <AppSettings ref={settingsEl}>
          <Settings isDev={config.isDev} />
        </AppSettings>
      </AppSettingsWrapper>
    </>
  );
});
