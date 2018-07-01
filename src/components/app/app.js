import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import ResizeObserver from "resize-observer-polyfill";
import SimpleStorage from "react-simple-storage";
import Unsplash from "unsplash-js";
import Menu from "../menu/menu.js";
import ConditionalUpdater from "../conditional-updater/conditional-updater.js";
import Clock from "../clock/clock.js";
import YearProgress from "../year-progress/year-progress.js";
import Age from "../age/age.js";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";

const unsplash = new Unsplash({
  applicationId:
    "b3cb7c587939d02e81ceda270fdad22f5b0447ae92cec92503abebb6f9935328",
  secret: "63aa959d4d73e2ebeb6c5d71fcbaaad2ea13f6b4461516c14c7012127c48426e"
});

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 9
  };

  constructor() {
    super();

    this.elAppMenu = null;
    this.state = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,

      image: window.localStorage.image
        ? JSON.parse(window.localStorage.image)
        : null,

      menuOpened: false,
      menuHeight: null,

      selectedView: types.views.CLOCK,

      clockShowSeconds: true
    };
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
    const image = await this.getRandomImage();

    localStorage.image = JSON.stringify(image);
    this.setState({
      image: image
    });
  };

  setClockShowSeconds = clockShowSeconds => {
    this.setState({ clockShowSeconds });
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

  async getRandomImage() {
    const request = await unsplash.photos.getRandomPhoto({
      width: this.state.screenWidth,
      height: this.state.screenHeight
    });
    const response = await request.json();

    return response;
  }

  async componentDidMount() {
    this.listenOnMenuResize();

    if (!this.state.image) {
      await this.setRandomImage();
    }
  }

  render() {
    const whiteList = ["selectedView", "clockShowSeconds"];
    const savedStateToStorage = Object.keys(this.state).filter(
      key => !whiteList.includes(key)
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
        <SimpleStorage parent={this} blacklist={savedStateToStorage} />

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
              // TODO
              const birthDate = new Date(1991, 3, 20).getTime();

              return (
                <AppContent>
                  <ConditionalUpdater
                    updateEveryN={time.year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={birthDate}
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

        <OutsideClick onClickOutside={this.closeMenu}>
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
                selectedView={this.state.selectedView}
                clockShowSeconds={this.state.clockShowSeconds}
                onClockShowSecondsChange={this.setClockShowSeconds}
                setViewType={this.setViewType}
                setRandomImage={this.setRandomImage}
                toggleMenu={this.toggleMenu}
              />
            </AppMenu>
          </AppMenuWrapper>
        </OutsideClick>
      </AppWrapper>
    );
  }
}

class OutsideClick extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.container = null;
  }

  onClick = e => {
    const clickOutside = !this.container.contains(e.target);
    if (clickOutside) {
      this.props.onClickOutside();
    }
  };

  handleListener(addListener) {
    window[addListener ? "addEventListener" : "removeEventListener"](
      "click",
      this.onClick,
      {
        capture: true,
        passive: true
      }
    );
  }

  componentWillUnmount() {
    this.handleListener(false);
  }

  componentDidMount() {
    this.handleListener(true);
  }

  render() {
    const { children, onClickOutside, ...restProps } = this.props;
    return (
      <div
        ref={el => {
          this.container = el;
        }}
        {...restProps}
      >
        {children}
      </div>
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
