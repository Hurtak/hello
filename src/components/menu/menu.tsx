import React from "react";
import propTypes from "prop-types";
import styled, { css } from "styled-components";
import withAppState from "../../state/with-app-state";
import * as s from "../../shared/styles";
import IAppStateProps from "../../state/app-state-type";
import { timestampToDateInputValue } from "../../shared/time";
import iconCog from "../../icons/cog.svg";

// TODO: better place to put it?
declare module "react" {
  interface HTMLAttributes<T> {
    inert?: "true" | null;
  }
}

interface IMenuProps {
  app: IAppStateProps;
  opened: boolean;
  isDev: boolean;
}

class Menu extends React.Component<IMenuProps, {}> {
  ageDateOfBirthChange = (e: any) => {
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
              {!this.props.app.state.online && (
                <div>
                  You are currently offline, falling back to local images
                </div>
              )}
              {this.props.app.state.imageBing &&
                this.props.app.state.imageBing.error && (
                  <div>
                    {/* TODO: proper error matching */}
                    <p>Error</p>
                    <p>
                      error:{" "}
                      {JSON.stringify(this.props.app.state.imageBing.error)}
                    </p>
                    <p>errorType: {this.props.app.state.imageBing.errorType}</p>
                    <p>
                      errorData: {String(this.props.app.state.imageBing.data)}
                    </p>
                    <pre>
                      <code>
                        {JSON.stringify(this.props.app.state.imageBing)}
                      </code>
                    </pre>
                  </div>
                )}

              <Radio
                name="images"
                onChange={() => this.props.app.setImageSource("BING")}
                checked={
                  this.props.app.computed.imageSourceWithFallback === "BING"
                }
                disabled={this.props.app.state.online === false}
              >
                Bing image of the day
              </Radio>

              <Radio
                name="images"
                onChange={() => this.props.app.setImageSource("LOCAL")}
                checked={
                  this.props.app.computed.imageSourceWithFallback === "LOCAL"
                }
              >
                Predefined
              </Radio>

              {this.props.app.computed.imageSourceWithFallback === "BING" &&
                this.props.app.state.imageBing &&
                this.props.app.state.imageBing.error === false && (
                  <section>
                    {this.props.app.state.imageBing.data.title && (
                      <Text>
                        title: {this.props.app.state.imageBing.data.title}
                      </Text>
                    )}
                    {this.props.app.state.imageBing.data.description && (
                      <Text>
                        description:{" "}
                        {this.props.app.state.imageBing.data.description}
                      </Text>
                    )}
                    {this.props.app.state.imageBing.data.link && (
                      <Text>
                        <a href={this.props.app.state.imageBing.data.link}>
                          link
                        </a>
                      </Text>
                    )}
                  </section>
                )}

              {this.props.app.computed.imageSourceWithFallback === "LOCAL" && (
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
                    const image = this.props.app.computed.imageLocal;

                    return (
                      <>
                        <Text>
                          image: {this.props.app.state.imageLocalIndex + 1}/
                          {this.props.app.computed.imagesLocal.length}
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
                onChange={() => this.props.app.setViewType("CLOCK")}
                checked={this.props.app.state.selectedView === "CLOCK"}
              >
                Clock
              </Radio>

              <Radio
                name="view"
                onChange={() => this.props.app.setViewType("AGE")}
                checked={this.props.app.state.selectedView === "AGE"}
              >
                Age
              </Radio>

              <Radio
                name="view"
                onChange={() => this.props.app.setViewType("NOTHING")}
                checked={this.props.app.state.selectedView === "NOTHING"}
              >
                Nothing
              </Radio>

              {this.props.app.state.selectedView === "CLOCK" && (
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

              {this.props.app.state.selectedView === "AGE" && (
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

interface IMenuWrapperProps {
  settingsHidden?: boolean;
}
const MenuWrapper = styled.section`
  box-sizing: "border-box";
  position: "relative";
  padding: ${s.grid(2)};
  overflow: "hidden";
  background-color: ${s.colors.whiteTransparentDefault};

  ${(props: IMenuWrapperProps) =>
    props.settingsHidden &&
    css`
      opacity: 0;
      transition: ${s.animations.default};
      &:hover {
        opacity: 1;
      }
    `};
`;

const ToggleButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  user-select: none;
  top: ${s.dimensions.menuButtonSpacing};
  right: ${s.dimensions.menuButtonSpacing};
  border: 0;
  background: transparent;
  padding: ${s.dimensions.menuButtonPadding};
  cursor: pointer;
`;

const ToggleButtonSpacer = styled.div`
  float: right;
  width: ${s.grid(8)};
  height: ${s.grid(8)};
`;

interface IToggleButtonIconProps {
  rotated?: boolean;
}

const ToggleButtonIcon = styled.img`
  display: block;
  width: ${s.dimensions.menuButtonSize};
  height: ${s.dimensions.menuButtonSize};
  object-fit: contain;
  transition: ${s.animations.default};
  opacity: ${s.opacity.default};

  ${(props: IToggleButtonIconProps) =>
    props.rotated &&
    css`
      transform: rotate(-360deg);
    `};
`;

const Heading = styled.h1`
  ${s.text.text};
  ${s.text.size18};

  padding-bottom: 0.25em;
`;

const HeadingSmall = styled.h2`
  ${s.text.text};
  ${s.text.size16};

  padding-bottom: 0.25em;
`;

const Text = styled.p`
  ${s.text.text};
`;

const MenuSectionsWrapper = styled.div`
  margin-top: ${s.grid(3)};
`;

const MenuSectionStyled = styled.section`
  margin-top: ${s.grid(2)};

  &:first-child {
    margin-top: 0;
  }
`;

const MenuSection = (props: {
  title: string;
  children: (false | JSX.Element)[]; // TODO: why false?
}) => (
  <MenuSectionStyled>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </MenuSectionStyled>
);

const Radio = (props: {
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => {}; // TODO: proper type?
  children: string;
}) => (
  <RadioLabel>
    <input
      type="radio"
      name={props.name}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    />
    <RadioText>{props.children}</RadioText>
  </RadioLabel>
);

const RadioLabel = styled.label`
  display: block;
`;

const RadioText = styled.span`
  ${s.text.text};

  color: ${s.colors.white};
  margin-left: ${s.grid(1)};
`;
