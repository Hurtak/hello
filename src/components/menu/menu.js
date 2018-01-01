import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import iconCog from "../../icons/cog.svg";

class Menu extends React.Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    selectedView: PropTypes.oneOf(Object.values(types.views)),
    setViewType: PropTypes.func.isRequired,
    setRandomImage: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired
  };

  render() {
    return (
      <MenuWrapper>
        <ToggleButton onClick={this.props.toggleMenu}>
          <ToggleButtonIcon src={iconCog} rotate={this.props.opened} />
        </ToggleButton>

        <Heading>Calendar</Heading>
        <Text>Something about this app</Text>

        <HeadingSmall>View type</HeadingSmall>

        <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.CLOCK)}
            checked={this.props.selectedView === types.views.CLOCK}
          >
            Clock
          </MenuOption>
        </TabIndexHandler>

        <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.CALENDAR)}
            checked={this.props.selectedView === types.views.CALENDAR}
          >
            Calendar
          </MenuOption>
        </TabIndexHandler>

        <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.AGE)}
            checked={this.props.selectedView === types.views.AGE}
          >
            Age
          </MenuOption>
        </TabIndexHandler>

        <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.NOTHING)}
            checked={this.props.selectedView === types.views.NOTHING}
          >
            Nothing
          </MenuOption>
        </TabIndexHandler>

        <HeadingSmall>Background image</HeadingSmall>

        <TabIndexHandler disableTabbing={!this.props.opened}>
          <button onClick={this.props.setRandomImage}>Random image</button>
        </TabIndexHandler>
      </MenuWrapper>
    );
  }
}

class TabIndexHandler extends React.Component {
  static propTypes = {
    disableTabbing: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number,
    children: PropTypes.element.isRequired
  };

  render() {
    const { children, disableTabbing, tabIndex } = this.props;

    const El = React.Children.map(children, child =>
      React.cloneElement(child, {
        tabIndex: disableTabbing ? -1 : tabIndex
      })
    );

    return El;
  }
}

const ToggleButton = glamorous.button({
  boxSizing: "border-box",
  position: "absolute",
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
    transition: "0.5s transform ease"
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
  ...s.text.heading
});

const HeadingSmall = glamorous.h1({
  ...s.text.text,
  ...s.text.headingSmall
});

const Text = glamorous.p({
  ...s.text.text,
  ...s.text.medium
});

const MenuWrapper = glamorous.section({
  boxSizing: "border-box",
  position: "relative",
  padding: s.grid(2),
  overflow: "hidden",
  backdropFilter: s.blur.wide
});

class MenuOption extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
  };

  render() {
    return (
      <label>
        <input
          onChange={this.props.onChange}
          type="radio"
          name="menu-option"
          checked={this.props.checked}
          tabIndex={this.props.tabIndex}
        />
        <MenuOptionText>{this.props.children}</MenuOptionText>
      </label>
    );
  }
}

const MenuOptionText = glamorous.span({
  ...s.text.text,
  ...s.text.medium,
  color: s.colors.white
});

export default Menu;
