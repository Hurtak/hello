import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
      // Image service local
      PropTypes.shape({
        imageIndex: PropTypes.number.isRequired,
        numberOfImages: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
        location: PropTypes.string,
        source: PropTypes.string
      }),
      // Image service Bing
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    ]),

    onImageServiceCall: PropTypes.func.isRequired,

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

  imageServiceMethodCall = methodName => {
    this.props.onImageServiceCall(methodName);
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
          <ToggleButtonIcon src={iconCog} rotated={this.props.opened} />
        </ToggleButton>

        <ToggleButtonSpacer />

        <div inert={this.props.opened === false ? "true" : null}>
          <Heading>Hello Friend &ndash; New Tab Page</Heading>
          <Text>
            This is your new cool new tab page. Enjoy a nice background from
            Bing every day or have a look at some nice background that I
            preselected. There is also a bunch of useful that you can display in
            front of the background, like clock and stuff!
          </Text>

          <MenuSectionsWrapper>
            <MenuSection title="Background image">
              <MenuOption
                name="images"
                onChange={() =>
                  this.props.onImageSourceChange(types.imageSourceTypes.BING)
                }
                checked={this.props.imageSource === types.imageSourceTypes.BING}
              >
                Bing image of the day
              </MenuOption>

              <MenuOption
                name="images"
                onChange={() =>
                  this.props.onImageSourceChange(types.imageSourceTypes.LOCAL)
                }
                checked={
                  this.props.imageSource === types.imageSourceTypes.LOCAL
                }
              >
                Predefined
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

              {this.props.imageSource === types.imageSourceTypes.LOCAL &&
                this.props.imageData && (
                  <section>
                    <button
                      onClick={() =>
                        this.imageServiceMethodCall("previousImage")
                      }
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => this.imageServiceMethodCall("randomImage")}
                    >
                      Random image
                    </button>
                    <button
                      onClick={() => this.imageServiceMethodCall("nextImage")}
                    >
                      Next
                    </button>

                    <Text>
                      image: {this.props.imageData.imageIndex + 1}/
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
                  </section>
                )}
            </MenuSection>

            <MenuSection title="View type">
              <MenuOption
                name="view"
                onChange={() =>
                  this.props.onSelectedViewChange(types.viewTypes.CLOCK)
                }
                checked={this.props.selectedView === types.viewTypes.CLOCK}
              >
                Clock
              </MenuOption>

              <MenuOption
                name="view"
                onChange={() =>
                  this.props.onSelectedViewChange(types.viewTypes.AGE)
                }
                checked={this.props.selectedView === types.viewTypes.AGE}
              >
                Age
              </MenuOption>

              <MenuOption
                name="view"
                onChange={() =>
                  this.props.onSelectedViewChange(types.viewTypes.NOTHING)
                }
                checked={this.props.selectedView === types.viewTypes.NOTHING}
              >
                Nothing
              </MenuOption>

              {this.props.selectedView === types.viewTypes.CLOCK && (
                <label>
                  <Text>
                    <input
                      type="checkbox"
                      checked={this.props.clockShowSeconds}
                      onChange={this.clockShowSecondsChange}
                    />
                    Show seconds
                  </Text>
                </label>
              )}

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
            </MenuSection>

            <MenuSection title="Minimalistic version">
              <Text>
                Settings button will be hidden unless you hover the mouse over
                the area where the button is. Also bunch of useless text (like
                this paragraph) will be hidden.
              </Text>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.settingsHidden}
                  onChange={this.settingsHiddenChange}
                />
                Hide stuff
              </label>
            </MenuSection>

            <MenuSection title="Contact">
              <Text>
                If you find any bugs or if you would like to tell me how much
                you like this swell plugin you can do so on following channels.
                Also this plugin is open source, so you contribute on GitHub!
              </Text>
              <a href="https://github.com/hurtak/hello-friend">Github</a>
              <a href="https://twitter.com/PetrHurtak">Twitter</a>
              <a href="mailto:petr.hurtak@gmail.com">Mail</a>
            </MenuSection>

            {this.props.isDev && (
              <MenuSection title="Dev menu">
                <Text>This menu is only visible in development mode</Text>
                <button onClick={this.resetAppState}>Reset app state</button>
              </MenuSection>
            )}
          </MenuSectionsWrapper>
        </div>
      </MenuWrapper>
    );
  }
}

const MenuWrapper = styled.section(
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

const ToggleButton = styled.button({
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

// TODO: maybe some better solution?
const ToggleButtonSpacer = styled.div({
  float: "right",
  width: s.grid(8),
  height: s.grid(8)
});

const ToggleButtonIcon = styled.img(
  {
    display: "block",
    width: s.dimensions.menuButtonSize,
    height: s.dimensions.menuButtonSize,
    objectFit: "contain",
    transition: s.animations.default,
    opacity: s.opacity.default
  },
  props => {
    if (props.rotated) {
      return {
        transform: "rotate(-360deg)"
      };
    }
  }
);

const Heading = styled.h1({
  ...s.text.text,
  ...s.text.size18
});

const HeadingSmall = styled.h1({
  ...s.text.text,
  ...s.text.size18
});

const Text = styled.p({
  ...s.text.text
});

const MenuSectionsWrapper = styled.div({
  marginTop: s.grid(3)
});

const MenuSectionStyled = styled.section({
  marginTop: s.grid(2),
  ":first-child": {
    marginTop: 0
  }
});

class MenuSection extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <MenuSectionStyled>
        <HeadingSmall>{this.props.title}</HeadingSmall>
        {this.props.children}
      </MenuSectionStyled>
    );
  }
}

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

const MenuOptionLabel = styled.label({
  display: "block"
});

const MenuOptionText = styled.span({
  ...s.text.text,
  color: s.colors.white
});

export default Menu;
