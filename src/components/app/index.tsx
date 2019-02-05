import React, { useState, useEffect, useRef } from "react";
import { view } from "react-easy-state";

import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported

import {
  AppWrapper,
  BackgroundWrapper,
  AppContent,
  AppMenuWrapper,
  AppMenu
} from "./styled";
import { Menu } from "../menu";
import { TimerUpdater } from "../timer-updater";
import { Clock } from "../clock";
import { Age } from "../age";
import { BackgroundImage } from "../background-image";
import { state } from "../../state/state";
import * as time from "../../shared/time";
import { GlobalStyles } from "../../styles/global-styles";
import { config } from "../../config";

export const App = view(() => {
  useEffect(() => {
    state.app.initialize();
    return () => state.app.destroy();
  }, []);

  return (
    <AppWrapper>
      <GlobalStyles />

      {state.app.initialized && <AppInner />}
    </AppWrapper>
  );
});

const AppInner = view(() => {
  const menuEl = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!menuEl.current) return;

    const observer = new ResizeObserver(entries => {
      setMenuHeight(entries[0].contentRect.height);
    });
    observer.observe(menuEl.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackgroundWrapper>
        <BackgroundImage url={state.image.imageUrl} />
      </BackgroundWrapper>

      {(() => {
        switch (state.settings.selectedView) {
          case "CLOCK":
            return (
              <AppContent center>
                <TimerUpdater
                  updateEveryN={
                    state.settings.clockShowSeconds ? time.second : time.minute
                  }
                  component={time => (
                    <Clock
                      time={time}
                      showSeconds={state.settings.clockShowSeconds}
                    />
                  )}
                  key={state.settings.selectedView}
                />
              </AppContent>
            );

          // case "CALENDAR":
          //   return (
          //     <AppContent center maxWidth>
          //       <TimerUpdater
          //         updateEveryN={time.day}
          //         component={time => <Calendar time={time} />}
          //         key={state.settings.selectedView}
          //       />
          //     </AppContent>
          //   );

          // case "YEAR_PROGRESS":
          //   return (
          //     <AppContent>
          //       <ConditionalUpdater
          //         updateEveryN={
          //           time.year / 100 / 10 ** config.yearProgressDecimalPlaces
          //         }
          //         component={time => (
          //           <YearProgress
          //             time={time}
          //             decimalPlaces={config.yearProgressDecimalPlaces}
          //           />
          //         )}
          //         key={state.selectedView}
          //       />
          //     </AppContent>
          //   );

          case "AGE": {
            return (
              <AppContent>
                <TimerUpdater
                  updateEveryN={time.year / 10 ** config.ageDecimalPlaces}
                  component={time => (
                    <Age
                      time={time}
                      birthDate={state.settings.ageDateOfBirthTimestamp}
                      decimalPlaces={config.ageDecimalPlaces}
                    />
                  )}
                  key={state.settings.selectedView}
                />
              </AppContent>
            );
          }

          case "NOTHING":
            return null;

          default:
            return null;
        }
      })()}

      <AppMenuWrapper
        opened={state.settings.menuOpened}
        menuHeight={menuHeight}
      >
        <AppMenu ref={menuEl}>
          <Menu isDev={config.isDev} />
        </AppMenu>
      </AppMenuWrapper>
    </>
  );
});
