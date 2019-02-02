import React, { useState, useEffect, useRef } from "react";
import { Normalize } from "styled-normalize";
import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported
import Menu from "../menu/menu";
import ConditionalUpdater from "../conditional-updater/conditional-updater";
import Clock from "../clock/clock";
import Age from "../age/age";
import BackgroundImage from "../background-image/background-image";
import { state } from "../../state/state";
import { styled, createGlobalStyle } from "../../shared/css";
import * as s from "../../shared/styles";
import * as constants from "../../shared/constants";
import * as time from "../../shared/time";
import { view } from "react-easy-state";

// TODO: unused
interface IAppState {
  menuHeight: number | null;
}

// TODO: move to global state???
const AppConfig = {
  yearProgressDecimalPlaces: 8,
  ageDecimalPlaces: 3
};

const App = view(() => {
  const menuEl = useRef(null);
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(() => {
    // state.appInit();
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
      <Normalize />
      <GlobalStyles />

      <BackgroundWrapper>
        <BackgroundImage url={state.image.imageUrl} />
      </BackgroundWrapper>

      {(() => {
        switch (state.settings.selectedView) {
          case "CLOCK":
            return (
              <AppContent center>
                <ConditionalUpdater
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

          // case types.views.CALENDAR:
          //   return (
          //     <AppContent center maxWidth>
          //       <ConditionalUpdater
          //         updateEveryN={time.day}
          //         component={time => <Calendar time={time} />}
          //         key={state.selectedView}
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
          //         key={state.selectedView}
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
                      birthDate={state.settings.ageDateOfBirthTimestamp}
                      decimalPlaces={AppConfig.ageDecimalPlaces}
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
          <Menu isDev={constants.isDev} />
        </AppMenu>
      </AppMenuWrapper>
    </AppWrapper>
  );
});
export default App;

// TODO: object syntax
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${s.colors.grayChrome};
    position: relative;
    /* https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll */
  }

  /* latin-ext */
  @font-face {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/lato-latin-ext.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/lato-latin.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

const AppWrapper = styled.div({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: s.grid(1)
});

interface AppContentProps {
  maxWidth?: boolean;
  center?: boolean;
}

const AppContent = styled.main((props: AppContentProps) => ({
  display: "flex",
  flex: "1 0 0",
  flexDirection: "column",
  width: "100%",
  zIndex: s.zIndex.content,
  ...(props.center && {
    justifyContent: "center",
    alignItems: "center"
  }),
  ...(props.maxWidth && {
    maxWidth: s.size(1200)
  })
}));

const BackgroundWrapper = styled.div({
  zIndex: s.zIndex.background
});

interface AppMenuWrapperProps {
  opened: boolean;
  menuHeight: IAppState["menuHeight"];
}

const AppMenuWrapper = styled.aside((props: AppMenuWrapperProps) => ({
  position: "absolute",
  direction: "rtl", // To make the overflow cropping from the right side
  top: s.grid(1),
  right: s.grid(1),
  width: s.dimensions.menuButtonSizeAndSpacing,
  height: s.dimensions.menuButtonSizeAndSpacing,
  transition: "0.5s all ease",
  overflow: "hidden",
  zIndex: s.zIndex.menu,
  ...(props.opened && {
    width: s.dimensions.menuWidth,
    height: props.menuHeight ? s.size(props.menuHeight) : "auto"
  })
}));

const AppMenu = styled.div({
  width: s.dimensions.menuWidth,
  direction: "ltr" // Reset direction set in AppMenuWrapper
});
