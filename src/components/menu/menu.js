import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";

class Menu extends React.Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    selectedView: PropTypes.oneOf(Object.values(types.views)),
    setViewType: PropTypes.func.isRequired,
    setRandomBackgroundImage: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired
  };

  render() {
    return (
      <MenuWrapper>
        <TabIndexHandler disableTabbing={!this.props.opened}>
          <button onClick={this.props.closeMenu}>Close</button>
        </TabIndexHandler>

        <Heading>Calendar</Heading>
        <Text>Something about this app</Text>

        <HeadingSmall>View type</HeadingSmall>

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
            onChange={() => this.props.setViewType(types.views.CLOCK)}
            checked={this.props.selectedView === types.views.CLOCK}
          >
            Clock
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
          <button onClick={this.props.setRandomBackgroundImage}>
            Random image
          </button>
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
  padding: s.grid(2),
  height: "100%",
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
