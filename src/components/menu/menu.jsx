import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import { timestampToDateInputValue } from "../../shared/time.js";
import iconCog from "../../icons/cog.svg";

class Menu extends React.Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,

    selectedView: PropTypes.oneOf(Object.values(types.viewTypes)).isRequired,
    onSelectedViewChange: PropTypes.func.isRequired,

    clockShowSeconds: PropTypes.bool.isRequired,
    onClockShowSecondsChange: PropTypes.func.isRequired,

    ageDateOfBirthValue: PropTypes.string.isRequired,
    ageDateOfBirthTimestamp: PropTypes.number.isRequired,
    onAgeDateOfBirthChange: PropTypes.func.isRequired,

    imageSource: PropTypes.oneOf(Object.values(types.imageSourceTypes))
      .isRequired,
    onImageSourceChange: PropTypes.func.isRequired,

    imageData: PropTypes.oneOfType([
      PropTypes.shape({
        currentImageIndex: PropTypes.number.isRequired,
        numberOfImages: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
        location: PropTypes.string,
        source: PropTypes.string
      }),
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    ]),

    onNextImageClick: PropTypes.func.isRequired,

    settingsHidden: PropTypes.bool.isRequired,
    onSettingsHiddenChange: PropTypes.func.isRequired,

    isDev: PropTypes.bool.isRequired,
    onResetAppState: PropTypes.func.isRequired
  };

  clockShowSecondsChange = () => {
    this.props.onClockShowSecondsChange(!this.props.clockShowSeconds);
  };

  ageDateOfBirthChange = e => {
    const valueRaw = e.target.value;
    const valueValid = valueRaw.length > 0;

    const timestamp = (() => {
      if (!valueValid) return null;

      const [year, month, day] = valueRaw.split("-").map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      return timestamp;
    })();

    this.props.onAgeDateOfBirthChange({
      inputValue: valueRaw,
      parsedTimestamp: timestamp
    });
  };

  settingsHiddenChange = () => {
    this.props.onSettingsHiddenChange(!this.props.settingsHidden);
  };

  nextImage = () => {
    this.props.onNextImageClick();
  };

  resetAppState = () => {
    this.props.onResetAppState();
  };

  render() {
    return (
      <MenuWrapper
        settingsHidden={this.props.settingsHidden && !this.props.opened}
      >
        <ToggleButton onClick={this.props.toggleMenu}>
          <ToggleButtonIcon src={iconCog} rotate={this.props.opened} />
        </ToggleButton>

        <div inert={this.props.opened === false ? "true" : null}>
          <Heading>Hello Friend!</Heading>
          <Text>New</Text>

          <HeadingSmall>View type</HeadingSmall>

          <section>
            <MenuOption
              name="view"
              onChange={() =>
                this.props.onSelectedViewChange(types.viewTypes.CLOCK)
              }
              checked={this.props.selectedView === types.viewTypes.CLOCK}
            >
              Clock
            </MenuOption>

            {this.props.selectedView === types.viewTypes.CLOCK && (
              <label>
                <input
                  type="checkbox"
                  checked={this.props.clockShowSeconds}
                  onChange={this.clockShowSecondsChange}
                />
                Show seconds
              </label>
            )}
          </section>

          {/*
            <MenuOption
              name="view"
              onChange={() => this.props.onSelectedViewChange(types.views.CALENDAR)}
              checked={this.props.selectedView === types.views.CALENDAR}
            >
              Calendar
            </MenuOption>
           */}

          {/*
            <MenuOption
              name="view"
              onChange={() => this.props.onSelectedViewChange(types.views.YEAR_PROGRESS)}
              checked={this.props.selectedView === types.views.YEAR_PROGRESS}
            >
              Year progress
            </MenuOption>
          */}

          <section>
            <MenuOption
              name="view"
              onChange={() =>
                this.props.onSelectedViewChange(types.viewTypes.AGE)
              }
              checked={this.props.selectedView === types.viewTypes.AGE}
            >
              Age
            </MenuOption>

            {this.props.selectedView === types.viewTypes.AGE && (
              <label>
                Your date of birth
                <input
                  type="date"
                  min={timestampToDateInputValue(Date.UTC(1900, 0, 1))}
                  max={timestampToDateInputValue(Date.now())}
                  value={this.props.ageDateOfBirthValue}
                  onChange={this.ageDateOfBirthChange}
                />
              </label>
            )}
          </section>

          <section>
            <MenuOption
              name="view"
              onChange={() =>
                this.props.onSelectedViewChange(types.viewTypes.NOTHING)
              }
              checked={this.props.selectedView === types.viewTypes.NOTHING}
            >
              Nothing
            </MenuOption>
          </section>

          <section>
            <HeadingSmall>Image source</HeadingSmall>

            <MenuOption
              name="images"
              onChange={() =>
                this.props.onImageSourceChange(types.imageSourceTypes.LOCAL)
              }
              checked={this.props.imageSource === types.imageSourceTypes.LOCAL}
            >
              Predefined
            </MenuOption>
            {this.props.imageSource === types.imageSourceTypes.LOCAL &&
              this.props.imageData && (
                <section>
                  <Text>
                    image: {this.props.imageData.currentImageIndex + 1}/
                    {this.props.imageData.numberOfImages}
                  </Text>
                  {this.props.imageData.name && (
                    <Text>name: {this.props.imageData.name}</Text>
                  )}
                  {this.props.imageData.location && (
                    <Text>location: {this.props.imageData.location}</Text>
                  )}
                  {this.props.imageData.source && (
                    <Text>
                      <a href={this.props.imageData.source}>source</a>
                    </Text>
                  )}
                  <button onClick={this.nextImage}>Next image</button>
                </section>
              )}

            <MenuOption
              name="images"
              onChange={() =>
                this.props.onImageSourceChange(types.imageSourceTypes.BING)
              }
              checked={this.props.imageSource === types.imageSourceTypes.BING}
            >
              Bing image of the day
            </MenuOption>
            {this.props.imageSource === types.imageSourceTypes.BING &&
              this.props.imageData && (
                <section>
                  {this.props.imageData.title && (
                    <Text>title: {this.props.imageData.title}</Text>
                  )}
                  {this.props.imageData.link && (
                    <Text>
                      <a href={this.props.imageData.link}>link</a>
                    </Text>
                  )}
                </section>
              )}
          </section>

          <section>
            <HeadingSmall>Hide settings</HeadingSmall>
            <Text>
              Settings button will be hidden unless you hover the mouse over the
              area where the button is
            </Text>
            <label>
              <input
                type="checkbox"
                checked={this.props.settingsHidden}
                onChange={this.settingsHiddenChange}
              />
              Hide settings
            </label>
          </section>

          {this.props.isDev && (
            <section>
              <HeadingSmall>Dev menu</HeadingSmall>
              <Text>This menu is only visible in development mode</Text>
              <button onClick={this.resetAppState}>Reset app state</button>
            </section>
          )}
        </div>
      </MenuWrapper>
    );
  }
}

const ToggleButton = glamorous.button({
  boxSizing: "border-box",
  position: "absolute",
  userSelect: "none",
  top: s.dimensions.menuButtonSpacing,
  right: s.dimensions.menuButtonSpacing,
  border: 0,
  background: "transparent",
  padding: s.dimensions.menuButtonPadding,
  cursor: "pointer"
});

const ToggleButtonIcon = glamorous.img(
  {
    display: "block",
    width: s.dimensions.menuButtonSize,
    height: s.dimensions.menuButtonSize,
    objectFit: "contain",
    transition: s.animations.default,
    opacity: s.opacity.default
  },
  props => {
    if (props.rotate) {
      return {
        transform: "rotate(-360deg)"
      };
    }
  }
);

const Heading = glamorous.h1({
  ...s.text.text,
  ...s.text.size18
});

const HeadingSmall = glamorous.h1({
  ...s.text.text,
  ...s.text.size18
});

const Text = glamorous.p({
  ...s.text.text
});

const MenuWrapper = glamorous.section(
  {
    boxSizing: "border-box",
    position: "relative",
    padding: s.grid(2),
    overflow: "hidden",
    backgroundColor: s.colors.whiteTransparentDefault
  },
  props => {
    if (props.settingsHidden) {
      return {
        opacity: 0,
        transition: s.animations.default,
        ":hover": {
          opacity: 1
        }
      };
    }
  }
);

class MenuOption extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
  };

  render() {
    return (
      <MenuOptionLabel>
        <input
          onChange={this.props.onChange}
          type="radio"
          name={this.props.name}
          checked={this.props.checked}
        />
        <MenuOptionText>{this.props.children}</MenuOptionText>
      </MenuOptionLabel>
    );
  }
}

const MenuOptionLabel = glamorous.label({
  display: "block"
});

const MenuOptionText = glamorous.span({
  ...s.text.text,
  color: s.colors.white
});

export default Menu;
