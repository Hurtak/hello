import React, { useState, useEffect, useRef } from "react";
import { useStore, useAction } from "easy-peasy";
import styled, { css } from "styled-components";
import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported
import Menu from "../menu/menu";
import ConditionalUpdater from "../conditional-updater/conditional-updater";
import Clock from "../clock/clock";
import Age from "../age/age";
import BackgroundImage from "../background-image/background-image";
import * as s from "../../shared/styles";
import * as constants from "../../shared/constants";
import * as time from "../../shared/time";

// TODO: unused
interface IAppState {
  menuHeight: number | null;
}

// TODO: move to global state???
const AppConfig = {
  yearProgressDecimalPlaces: 8,
  ageDecimalPlaces: 3
};

const App = () => {
  const menuEl = useRef(null);
  const [menuHeight, setMenuHeight] = useState(null);

  const {
    imageUrl,
    selectedView,
    clockShowSeconds,
    ageDateOfBirthTimestamp,
    menuOpened
  } = useStore((store: any) => ({
    imageUrl: store.imageUrl,
    selectedView: store.selectedView,
    clockShowSeconds: store.clockShowSeconds,
    ageDateOfBirthTimestamp: store.ageDateOfBirthTimestamp,
    menuOpened: store.menuOpened
  }));

  const appInit = useAction((actions: any) => actions.appInit);
  useEffect(() => {
    appInit();
  }, []);

  useEffect(() => {
    if (!menuEl.current) return;

    const observer = new ResizeObserver((entries: any) => {
      setMenuHeight(entries[0].contentRect.height);
    });
    observer.observe(menuEl.current as any);

    return () => observer.disconnect();
  }, []);

  return (
    <AppWrapper>
      <s.GlobalStyles />

      <BackgroundWrapper>
        <BackgroundImage url={imageUrl} />
      </BackgroundWrapper>

      {(() => {
        switch (selectedView) {
          case "CLOCK":
            return (
              <AppContent center>
                <ConditionalUpdater
                  updateEveryN={clockShowSeconds ? time.second : time.minute}
                  component={time => (
                    <Clock time={time} showSeconds={clockShowSeconds} />
                  )}
                  key={selectedView}
                />
              </AppContent>
            );

          // case types.views.CALENDAR:
          //   return (
          //     <AppContent center maxWidth>
          //       <ConditionalUpdater
          //         updateEveryN={time.day}
          //         component={time => <Calendar time={time} />}
          //         key={selectedView}
          //       />
          //     </AppContent>
          //   );

          // case "YEAR_PROGRESS":
          //   return (
          //     <AppContent>
          //       <ConditionalUpdater
          //         updateEveryN={
          //           time.year / 100 / 10 ** AppConfig.yearProgressDecimalPlaces
          //         }
          //         component={time => (
          //           <YearProgress
          //             time={time}
          //             decimalPlaces={AppConfig.yearProgressDecimalPlaces}
          //           />
          //         )}
          //         key={selectedView}
          //       />
          //     </AppContent>
          //   );

          case "AGE": {
            return (
              <AppContent>
                <ConditionalUpdater
                  updateEveryN={time.year / 10 ** AppConfig.ageDecimalPlaces}
                  component={time => (
                    <Age
                      time={time}
                      birthDate={ageDateOfBirthTimestamp}
                      decimalPlaces={AppConfig.ageDecimalPlaces}
                    />
                  )}
                  key={selectedView}
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

      <AppMenuWrapper opened={menuOpened} menuHeight={menuHeight}>
        <AppMenu ref={menuEl}>
          <Menu isDev={constants.isDev} />
        </AppMenu>
      </AppMenuWrapper>
    </AppWrapper>
  );
};
export default App;

const AppWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: ${s.grid(1)};
`;

interface AppContentProps {
  maxWith?: boolean;
  center?: boolean;
}

const AppContent = styled.main`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  width: 100%;
  z-index: ${s.zIndex.content};
  ${(props: AppContentProps) =>
    props.maxWith &&
    css`
      max-width: ${s.size(1200)};
    `};
  ${(props: AppContentProps) =>
    props.center &&
    css`
      justify-content: center;
      align-items: center;
    `};
`;

const BackgroundWrapper = styled.div`
  z-index: ${s.zIndex.background};
`;

interface AppMenuWrapperProps {
  opened: boolean;
  menuHeight: IAppState["menuHeight"];
}

const AppMenuWrapper = styled.aside`
  position: absolute;
  direction: rtl; /* To make the overflow cropping from the right side */
  top: ${s.grid(1)};
  right: ${s.grid(1)};
  width: ${s.dimensions.menuButtonSizeAndSpacing};
  height: ${s.dimensions.menuButtonSizeAndSpacing};
  transition: 0.5s all ease;
  overflow: hidden;
  z-index: ${s.zIndex.menu};
  ${(props: AppMenuWrapperProps) =>
    props.opened &&
    css`
      width: ${s.dimensions.menuWidth};
      height: ${props.menuHeight ? s.size(props.menuHeight) : "auto"};
    `};
`;

const AppMenu = styled.div`
  width: ${s.dimensions.menuWidth};
  direction: ltr; /* Reset direction set in AppMenuWrapper */
`;
