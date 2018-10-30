import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported
import Menu from "../menu/menu.jsx";
import ConditionalUpdater from "../conditional-updater/conditional-updater.jsx";
import Clock from "../clock/clock.jsx";
import YearProgress from "../year-progress/year-progress.jsx";
import Age from "../age/age.tsx";
import BackgroundImage from "../background-image/background-image.jsx";
import { appStateProps, withAppState } from "../../state/app-state.js";
import * as s from "../../shared/styles.js";
import * as constants from "../../shared/constants.js";
import * as time from "../../shared/time.js";

class App extends React.Component {
  static propTypes = {
    app: appStateProps
  };

  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 3
  };

  constructor(props) {
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
            case constants.viewTypes.CLOCK:
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

            case constants.viewTypes.YEAR_PROGRESS:
              return (
                <AppContent>
                  <ConditionalUpdater
                    updateEveryN={
                      time.year /
                      100 /
                      10 ** App.config.yearProgressDecimalPlaces
                    }
                    component={time => (
                      <YearProgress
                        time={time}
                        decimalPlaces={App.config.yearProgressDecimalPlaces}
                      />
                    )}
                    key={this.props.app.state.selectedView}
                  />
                </AppContent>
              );

            case constants.viewTypes.AGE: {
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

            case constants.viewTypes.NOTHING:
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
            ref={el => {
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

const AppContent = styled.main(
  {
    display: "flex",
    flex: "1 0 0",
    flexDirection: "column",
    width: "100%",
    zIndex: s.zIndex.content
  },
  props => {
    let styles = [];

    if (props.maxWidth) {
      styles.push({
        maxWidth: s.size(1200)
      });
    }

    if (props.center) {
      styles.push({
        justifyContent: "center",
        alignItems: "center"
      });
    }

    return styles;
  }
);

const BackgroundWrapper = styled.div({
  zIndex: s.zIndex.background
});

const AppMenuWrapper = styled.aside(
  {
    position: "absolute",
    direction: "rtl", // To make the overflow cropping from the right side
    top: s.grid(1),
    right: s.grid(1),
    width: s.dimensions.menuButtonSizeAndSpacing,
    height: s.dimensions.menuButtonSizeAndSpacing,
    transition: "0.5s all ease",
    overflow: "hidden",
    zIndex: s.zIndex.menu
  },
  props => {
    if (props.opened) {
      return {
        width: s.dimensions.menuWidth,
        height: props.menuHeight ? s.size(props.menuHeight) : "auto"
      };
    }
  }
);
AppMenuWrapper.propTypes = {
  opened: propTypes.bool,
  menuHeight: propTypes.number
};

const AppMenu = styled.div({
  width: s.dimensions.menuWidth,
  direction: "ltr" // Reset direction set in AppMenuWrapper
});
