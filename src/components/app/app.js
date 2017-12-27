import React from "react";
import glamorous from "glamorous";
import MenuWrapper from "../menu/menu.js";
import ConditionalUpdater from "../conditional-updater/conditional-updater.js";
import Clock from "../clock/clock.js";
import Calendar from "../calendar/calendar.js";
import YearProgress from "../year-progress/year-progress.js";
import Age from "../age/age.js";
import * as s from "../../styles/styles-shared.js";

// TODO: move images somewhere else
// import img from '../img/moonlight.jpg'
import dark from "../../img/night.jpg";
import light from "../../img/47.jpg";

const viewTypes = {
  CLOCK: "CLOCK",
  CALENDAR: "CALENDAR",
  YEAR_PROGRESS: "YEAR_PROGRESS",
  AGE: "AGE",
  NOTHING: "NOTHING"
};

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 9
  };

  state = {
    backgroundImage: light,
    menuOpened: false,
    selectedView: viewTypes.CALENDAR
  };

  toggleMenuOpenedState = () => {
    this.setState(prevState => ({
      menuOpened: !prevState.menuOpened
    }));
  };

  setViewType = newViewType => {
    this.setState({
      selectedView: newViewType
    });
  };

  setRandomBackgroundImage = () => {
    this.setState(prevState => ({
      backgroundImage: prevState.backgroundImage === light ? dark : light
    }));
  };

  render() {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const year = 365 * day;

    return (
      <AppWrapper
        style={{
          backgroundImage: `url("${this.state.backgroundImage}")`
        }}
      >
        <AppContent>
          {(() => {
            switch (this.state.selectedView) {
              case viewTypes.CLOCK:
                return (
                  <ConditionalUpdater
                    updateEveryN={minute}
                    component={time => <Clock time={time} />}
                  />
                );

              case viewTypes.CALENDAR:
                return (
                  <ConditionalUpdater
                    updateEveryN={day}
                    component={time => <Calendar time={time} />}
                  />
                );

              case viewTypes.YEAR_PROGRESS:
                return (
                  <ConditionalUpdater
                    updateEveryN={
                      year / 100 / 10 ** App.config.yearProgressDecimalPlaces
                    }
                    component={time => (
                      <YearProgress
                        time={time}
                        decimalPlaces={App.config.yearProgressDecimalPlaces}
                      />
                    )}
                  />
                );

              case viewTypes.AGE: {
                const birthDate = new Date(1991, 3, 20).getTime();

                return (
                  <ConditionalUpdater
                    updateEveryN={year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={birthDate}
                        decimalPlaces={App.config.ageDecimalPlaces}
                      />
                    )}
                  />
                );
              }

              case viewTypes.NOTHING:
                return null;

              default:
                throw new Error("Unknown view");
            }
          })()}
        </AppContent>

        <MenuButton onClick={this.toggleMenuOpenedState}>Settings</MenuButton>

        <AppMenu opened={this.state.menuOpened}>
          <MenuWrapper
            selectedView={this.state.selectedView}
            setViewType={this.setViewType}
            setRandomBackgroundImage={this.setRandomBackgroundImage}
          />
        </AppMenu>
      </AppWrapper>
    );
  }
}

const AppWrapper = glamorous.div({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: s.grid(1),
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  // Menu is overflowing and is hidden on the right side
  overflowX: "hidden"
});

const AppContent = glamorous.main({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1200px",
  width: "100%"
});

const AppMenu = glamorous.aside(
  {
    boxSizing: "border-box",
    position: "absolute",
    top: "0",
    left: "100%",
    width: "400px",
    height: "100%",
    transition: "0.5s all ease"
  },
  props => {
    if (props.opened) {
      return { transform: "translateX(-100%)" };
    }
  }
);

const MenuButton = glamorous.button({
  position: "absolute",
  left: s.grid(1),
  top: s.grid(1)
});

export default App;
