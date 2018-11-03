import React from "react";
import propTypes from "prop-types";
import styled, { css } from "styled-components";
import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported
import Menu from "../menu/menu";
import ConditionalUpdater from "../conditional-updater/conditional-updater";
import Clock from "../clock/clock";
import YearProgress from "../year-progress/year-progress";
import Age from "../age/age";
import BackgroundImage from "../background-image/background-image";
import withAppState from "../../state/with-app-state";
import IAppStateProps from "../../state/app-state-type";
import * as s from "../../shared/styles";
import * as constants from "../../shared/constants";
import * as time from "../../shared/time";
import * as types from "../../shared/types";

interface IAppProps {
  app: IAppStateProps;
}

interface IAppState {
  menuHeight: number | null;
}

class App extends React.Component<IAppProps, IAppState> {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 3
  };

  elAppMenu: any;

  constructor(props: IAppProps) {
    super(props);

    this.elAppMenu = null;

    this.state = {
      // Menu states
      menuHeight: null
    };
  }

  listenOnMenuResize() {
    // TODO: remove the listeners on componentWillUnmount?
    const observer = new ResizeObserver(entries => {
      this.setState({
        menuHeight: entries[0].contentRect.height
      });
    });
    observer.observe(this.elAppMenu);
  }

  async componentDidMount() {
    this.listenOnMenuResize();
    await this.props.app.initImage();
  }

  render() {
    return (
      <AppWrapper>
        <s.GlobalStyles />

        <BackgroundWrapper>
          <BackgroundImage url={this.props.app.computed.imageUrl} />
        </BackgroundWrapper>

        {(() => {
          switch (this.props.app.state.selectedView) {
            case "CLOCK":
              return (
                <AppContent center>
                  <ConditionalUpdater
                    updateEveryN={
                      this.props.app.state.clockShowSeconds
                        ? time.second
                        : time.minute
                    }
                    component={time => (
                      <Clock
                        time={time}
                        showSeconds={this.props.app.state.clockShowSeconds}
                      />
                    )}
                    key={this.props.app.state.selectedView}
                  />
                </AppContent>
              );

            // case types.views.CALENDAR:
            //   return (
            //     <AppContent center maxWidth>
            //       <ConditionalUpdater
            //         updateEveryN={time.day}
            //         component={time => <Calendar time={time} />}
            //         key={this.props.app.state.selectedView}
            //       />
            //     </AppContent>
            //   );

            // case "YEAR_PROGRESS":
            //   return (
            //     <AppContent>
            //       <ConditionalUpdater
            //         updateEveryN={
            //           time.year /
            //           100 /
            //           10 ** App.config.yearProgressDecimalPlaces
            //         }
            //         component={time => (
            //           <YearProgress
            //             time={time}
            //             decimalPlaces={App.config.yearProgressDecimalPlaces}
            //           />
            //         )}
            //         key={this.props.app.state.selectedView}
            //       />
            //     </AppContent>
            //   );

            case "AGE": {
              return (
                <AppContent>
                  <ConditionalUpdater
                    updateEveryN={time.year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={this.props.app.state.ageDateOfBirthTimestamp}
                        decimalPlaces={App.config.ageDecimalPlaces}
                      />
                    )}
                    key={this.props.app.state.selectedView}
                  />
                </AppContent>
              );
            }

            case "NOTHING":
              return null;

            default:
              throw new Error("Unknown view");
          }
        })()}

        <AppMenuWrapper
          opened={this.props.app.state.menuOpened}
          menuHeight={this.state.menuHeight}
        >
          {/* TODO: new ref api? */}
          <AppMenu
            ref={(el: any) => {
              this.elAppMenu = el;
            }}
          >
            <Menu
              opened={this.props.app.state.menuOpened}
              isDev={constants.isDev}
            />
          </AppMenu>
        </AppMenuWrapper>
      </AppWrapper>
    );
  }
}
export default withAppState(App);

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
  z-index: ${s.zIndex.menu}
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
