import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { appStateProps, withAppState } from "../../state/app-state.js";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/constants.js";
import { timestampToDateInputValue } from "../../shared/time.js";
import iconCog from "../../icons/cog.svg";

class Menu extends React.Component {
  static propTypes = {
    app: appStateProps,
    opened: propTypes.bool.isRequired,
    isDev: propTypes.bool.isRequired
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

    this.props.app.setAgeDateOfBirth({
      inputValue: valueRaw,
      parsedTimestamp: timestamp
    });
  };

  render() {
    return (
      <MenuWrapper
        settingsHidden={
          this.props.app.state.settingsHidden && !this.props.opened
        }
      >
        <ToggleButton onClick={this.props.app.toggleMenu}>
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
              <Radio
                name="images"
                onChange={() =>
                  this.props.app.setImageSource(types.imageSourceTypes.BING)
                }
                checked={
                  this.props.app.state.imageSource ===
                  types.imageSourceTypes.BING
                }
              >
                Bing image of the day
              </Radio>

              <Radio
                name="images"
                onChange={() =>
                  this.props.app.setImageSource(types.imageSourceTypes.LOCAL)
                }
                checked={
                  this.props.app.state.imageSource ===
                  types.imageSourceTypes.LOCAL
                }
              >
                Predefined
              </Radio>

              {this.props.app.state.imageSource ===
                types.imageSourceTypes.BING &&
                this.props.app.state.imageBing && (
                  <section>
                    {this.props.app.state.imageBing.title && (
                      <Text>title: {this.props.app.state.imageBing.title}</Text>
                    )}
                    {this.props.app.state.imageBing.description && (
                      <Text>
                        description:{" "}
                        {this.props.app.state.imageBing.description}
                      </Text>
                    )}
                    {this.props.app.state.imageBing.link && (
                      <Text>
                        <a href={this.props.app.state.imageBing.link}>link</a>
                      </Text>
                    )}
                  </section>
                )}

              {this.props.app.state.imageSource ===
                types.imageSourceTypes.LOCAL &&
                this.props.app.state.imageLocal && (
                  <section>
                    <button
                      onClick={() => this.props.app.shiftImageLocalIndex(-1)}
                    >
                      Prev
                    </button>
                    <button onClick={this.props.app.setImageLocalRandom}>
                      Random image
                    </button>
                    <button
                      onClick={() => this.props.app.shiftImageLocalIndex(1)}
                    >
                      Next
                    </button>

                    {(() => {
                      const image = this.props.app.state.imagesLocal[
                        this.props.app.state.imageLocal.index
                      ];

                      return (
                        <>
                          <Text>
                            image: {this.props.app.state.imageLocal.index + 1}/
                            {this.props.app.state.imagesLocal.length}
                          </Text>
                          {image.name && <Text>name: {image.name}</Text>}
                          {image.location && (
                            <Text>location: {image.location}</Text>
                          )}
                          {image.source && (
                            <Text>
                              <a href={image.source}>source</a>
                            </Text>
                          )}
                        </>
                      );
                    })()}
                  </section>
                )}
            </MenuSection>

            <MenuSection title="View type">
              <Radio
                name="view"
                onChange={() =>
                  this.props.app.setViewType(types.viewTypes.CLOCK)
                }
                checked={
                  this.props.app.state.selectedView === types.viewTypes.CLOCK
                }
              >
                Clock
              </Radio>

              <Radio
                name="view"
                onChange={() => this.props.app.setViewType(types.viewTypes.AGE)}
                checked={
                  this.props.app.state.selectedView === types.viewTypes.AGE
                }
              >
                Age
              </Radio>

              <Radio
                name="view"
                onChange={() =>
                  this.props.app.setViewType(types.viewTypes.NOTHING)
                }
                checked={
                  this.props.app.state.selectedView === types.viewTypes.NOTHING
                }
              >
                Nothing
              </Radio>

              {this.props.app.state.selectedView === types.viewTypes.CLOCK && (
                <label>
                  <Text>
                    <input
                      type="checkbox"
                      checked={this.props.app.state.clockShowSeconds}
                      onChange={this.props.app.toggleClockShowSeconds}
                    />
                    Show seconds
                  </Text>
                </label>
              )}

              {this.props.app.state.selectedView === types.viewTypes.AGE && (
                <label>
                  Your date of birth
                  <input
                    type="date"
                    min={timestampToDateInputValue(Date.UTC(1900, 0, 1))}
                    max={timestampToDateInputValue(Date.now())}
                    value={this.props.app.state.ageDateOfBirthValue}
                    onChange={e => this.ageDateOfBirthChange(e)}
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
                  checked={this.props.app.state.settingsHidden}
                  onChange={this.props.app.toggleSettingsHidden}
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
                <button onClick={this.props.app.resetAppState}>
                  Reset app state
                </button>
              </MenuSection>
            )}
          </MenuSectionsWrapper>
        </div>
      </MenuWrapper>
    );
  }
}
export default withAppState(Menu);

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
MenuWrapper.propTypes = {
  settingsHidden: propTypes.bool
};

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
ToggleButtonIcon.propTypes = {
  rotated: propTypes.bool
};

const Heading = styled.h1({
  ...s.text.text,
  ...s.text.size18,
  paddingBottom: "0.25em"
});

const HeadingSmall = styled.h2({
  ...s.text.text,
  ...s.text.size16,
  paddingBottom: "0.25em"
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

const MenuSection = props => (
  <MenuSectionStyled>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </MenuSectionStyled>
);
MenuSection.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired
};

const Radio = props => (
  <RadioLabel>
    <input
      onChange={props.onChange}
      type="radio"
      name={props.name}
      checked={props.checked}
    />
    <RadioText>{props.children}</RadioText>
  </RadioLabel>
);
Radio.propTypes = {
  name: propTypes.string.isRequired,
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  children: propTypes.string.isRequired
};

const RadioLabel = styled.label({
  display: "block"
});

const RadioText = styled.span({
  ...s.text.text,
  color: s.colors.white,
  marginLeft: s.grid(1)
});
