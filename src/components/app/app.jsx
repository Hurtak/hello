import React from "react";
import styled from "styled-components";
import ResizeObserver from "resize-observer-polyfill"; // TODO: remove once widely supported
import "wicg-inert"; // TODO: remove once widely supported
import Menu from "../menu/menu.jsx";
import ConditionalUpdater from "../conditional-updater/conditional-updater.jsx";
import Clock from "../clock/clock.jsx";
import YearProgress from "../year-progress/year-progress.jsx";
import Age from "../age/age.jsx";
import BackgroundImage from "../background-image/background-image.jsx";
import ImageServiceLocal from "../image-service/image-service-local.jsx";
import ImageServiceBing from "../image-service/image-service-bing.jsx";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";
import {
  initLocalStorage,
  saveToLocalStorage,
  clearLocalStorage
} from "../../shared/local-storage";
import { isDev } from "../../shared/dev.js";

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 3,

    savedState: [
      "selectedView",
      "clockShowSeconds",
      "ageDateOfBirthTimestamp",
      "ageDateOfBirthValue",
      "imageSource",
      "settingsHidden"
    ]
  };

  constructor() {
    super();

    this.elAppMenu = null;
    this.imageServiceMethods = null;

    this.state = initLocalStorage(App.config.savedState, App.name, {
      menuOpened: false,
      menuHeight: null,

      selectedView: types.viewTypes.CLOCK,
      clockShowSeconds: true,
      ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
      ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
      imageSource: types.imageSourceTypes.LOCAL,
      settingsHidden: false,

      imageUrl: null,
      imageData: null
    });
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

  setImage = ({ imageUrl, imageData }) => {
    this.setState({ imageUrl, imageData });
  };

  nextImage = () => {
    this.imageServiceMethods.nextImage();
  };

  imageServiceInit = ({ methods }) => {
    this.imageServiceMethods = methods;
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

  resetAppState = () => {
    clearLocalStorage();
    window.location.reload();
  };

  componentDidMount() {
    this.listenOnMenuResize();
  }

  componentDidUpdate() {
    saveToLocalStorage(App.config.savedState, App.name, this.state);
  }

  render() {
    return (
      <AppWrapper>
        <s.GlobalStyles />

        {this.state.imageSource === types.imageSourceTypes.LOCAL && (
          <ImageServiceLocal
            onInit={this.imageServiceInit}
            onImageChange={this.setImage}
          />
        )}
        {this.state.imageSource === types.imageSourceTypes.BING && (
          <ImageServiceBing onImageChange={this.setImage} />
        )}

        <BackgroundWrapper>
          <BackgroundImage url={this.state.imageUrl} />
        </BackgroundWrapper>

        {(() => {
          switch (this.state.selectedView) {
            case types.viewTypes.CLOCK:
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

            case types.viewTypes.YEAR_PROGRESS:
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

            case types.viewTypes.AGE: {
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

            case types.viewTypes.NOTHING:
              return null;

            default:
              throw new Error("Unknown view");
          }
        })()}

        <AppMenuWrapper
          opened={this.state.menuOpened}
          menuHeight={this.state.menuHeight}
        >
          {/* TODO: new ref api? */}
          <AppMenu
            ref={el => {
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
              imageData={this.state.imageData}
              onNextImageClick={this.nextImage}
              settingsHidden={this.state.settingsHidden}
              onSettingsHiddenChange={this.setSettingsHidden}
              isDev={isDev}
              onResetAppState={this.resetAppState}
            />
          </AppMenu>
        </AppMenuWrapper>
      </AppWrapper>
    );
  }
}

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

const AppMenu = styled.div({
  width: s.dimensions.menuWidth,
  direction: "ltr" // Reset direction set in AppMenuWrapper
});

export default App;
