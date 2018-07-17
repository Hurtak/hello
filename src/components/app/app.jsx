import React from "react";
import glamorous from "glamorous";
import SimpleStorage, { clearStorage } from "react-simple-storage";
import ResizeObserver from "resize-observer-polyfill";
import Menu from "../menu/menu.jsx";
import ConditionalUpdater from "../conditional-updater/conditional-updater.jsx";
import Clock from "../clock/clock.jsx";
import YearProgress from "../year-progress/year-progress.jsx";
import Age from "../age/age.jsx";
import * as imageService from "../background-image/image-service.js";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";
import { isDev } from "../../shared/dev.js";

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 9,

    savedState: [
      "image",
      "selectedView",
      "clockShowSeconds",
      "ageDateOfBirthTimestamp",
      "ageDateOfBirthValue",
      "imageSource",
      "settingsHidden"
    ]
  };

  static initialState = {
    menuOpened: true,
    menuHeight: null,

    selectedView: types.views.CLOCK,
    clockShowSeconds: true,
    ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
    ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
    imageSource: types.imageSources.LOCAL,
    settingsHidden: false,

    image: null
  };

  constructor() {
    super();

    this.elAppMenu = null;
    this.screen = {
      width: window.screen.width,
      heigth: window.screen.height
    };

    this.state = App.initialState;
  }

  toggleMenu = () => {
    this.setState(prevState => ({ menuOpened: !prevState.menuOpened }));
  };

  closeMenu = () => {
    this.setState({ menuOpened: false });
  };

  setViewType = newViewType => {
    this.setState({ selectedView: newViewType });
  };

  setRandomImage = async () => {
    const image = await imageService.getRandomImage(
      this.screen.width,
      this.screen.height
    );
    this.setState({ image: image });
  };

  setClockShowSeconds = clockShowSeconds => {
    this.setState({ clockShowSeconds });
  };

  setAgeDateOfBirth = ({ inputValue, parsedTimestamp }) => {
    this.setState(prevState => ({
      ageDateOfBirthValue: inputValue,
      ageDateOfBirthTimestamp: parsedTimestamp
        ? parsedTimestamp
        : prevState.ageDateOfBirthTimestamp
    }));
  };

  setImageSource = imageSource => {
    this.setState({ imageSource });
  };

  setSettingsHidden = settingsHidden => {
    this.setState({ settingsHidden });
  };

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
  }

  onAppStateHydratedFromLocalStorage = async () => {
    if (!this.state.image) {
      await this.setRandomImage();
    }
  };

  resetAppState = () => {
    this.setState(App.initialState, () => {
      clearStorage();
      window.location.reload();
    });
  };

  render() {
    const savedStateToStorage = Object.keys(this.state).filter(
      key => !App.config.savedState.includes(key)
    );

    return (
      <AppWrapper
        style={{
          // TODO: ckeck the url, it has crop parameter, we probably do not want that.
          backgroundImage: this.state.image
            ? `url("${this.state.image.urls.custom}")`
            : null
        }}
      >
        <SimpleStorage
          parent={this}
          blacklist={savedStateToStorage}
          onParentStateHydrated={this.onAppStateHydratedFromLocalStorage}
        />

        {(() => {
          switch (this.state.selectedView) {
            case types.views.CLOCK:
              return (
                <AppContent center>
                  <ConditionalUpdater
                    updateEveryN={
                      this.state.clockShowSeconds ? time.second : time.minute
                    }
                    component={time => (
                      <Clock
                        time={time}
                        showSeconds={this.state.clockShowSeconds}
                      />
                    )}
                    key={this.state.selectedView}
                  />
                </AppContent>
              );

            // case types.views.CALENDAR:
            //   return (
            //     <AppContent center maxWidth>
            //       <ConditionalUpdater
            //         updateEveryN={time.day}
            //         component={time => <Calendar time={time} />}
            //         key={this.state.selectedView}
            //       />
            //     </AppContent>
            //   );

            case types.views.YEAR_PROGRESS:
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
                    key={this.state.selectedView}
                  />
                </AppContent>
              );

            case types.views.AGE: {
              return (
                <AppContent>
                  <ConditionalUpdater
                    updateEveryN={time.year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={this.state.ageDateOfBirthTimestamp}
                        decimalPlaces={App.config.ageDecimalPlaces}
                      />
                    )}
                    key={this.state.selectedView}
                  />
                </AppContent>
              );
            }

            case types.views.NOTHING:
              return null;

            default:
              throw new Error("Unknown view");
          }
        })()}

        <AppMenuWrapper
          opened={this.state.menuOpened}
          menuHeight={this.state.menuHeight}
        >
          <AppMenu
            innerRef={el => {
              this.elAppMenu = el;
            }}
          >
            <Menu
              opened={this.state.menuOpened}
              toggleMenu={this.toggleMenu}
              selectedView={this.state.selectedView}
              onSelectedViewChange={this.setViewType}
              clockShowSeconds={this.state.clockShowSeconds}
              onClockShowSecondsChange={this.setClockShowSeconds}
              ageDateOfBirthValue={this.state.ageDateOfBirthValue}
              ageDateOfBirthTimestamp={this.state.ageDateOfBirthTimestamp}
              onAgeDateOfBirthChange={this.setAgeDateOfBirth}
              imageSource={this.state.imageSource}
              onImageSourceChange={this.setImageSource}
              settingsHidden={this.state.settingsHidden}
              onSettingsHiddenChange={this.setSettingsHidden}
              setRandomImage={this.setRandomImage}
              isDev={isDev}
              onResetAppState={this.resetAppState}
            />
          </AppMenu>
        </AppMenuWrapper>
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
  backgroundRepeat: "no-repeat"
});

const AppContent = glamorous.main(
  {
    display: "flex",
    flex: "1 0 0",
    flexDirection: "column",
    width: "100%"
  },
  props => {
    let styles = [];

    if (props.maxWidth) {
      styles.push({
        maxWidth: "1200px"
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

const AppMenuWrapper = glamorous.aside(
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
        height: props.menuHeight ? `${props.menuHeight}px` : "auto"
      };
    }
  }
);

const AppMenu = glamorous.div({
  width: s.dimensions.menuWidth,
  direction: "ltr" // Reset direction set in AppMenuWrapper
});

export default App;
