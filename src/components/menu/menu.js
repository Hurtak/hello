import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";

class Menu extends React.Component {
  static propTypes = {
    selectedView: PropTypes.oneOf(Object.values(types.views)),
    setViewType: PropTypes.func.isRequired,
    setRandomBackgroundImage: PropTypes.func.isRequired
  };

  render() {
    return (
      <MenuWrapper>
        <h1>Calendar</h1>
        <p>Something about this app</p>
        <h2>View type</h2>
        <MenuOption
          onChange={() => this.props.setViewType(types.views.CALENDAR)}
          checked={this.props.selectedView === types.views.CALENDAR}
        >
          Calendar
        </MenuOption>
        <MenuOption
          onChange={() => this.props.setViewType(types.views.CLOCK)}
          checked={this.props.selectedView === types.views.CLOCK}
        >
          Clock
        </MenuOption>
        <MenuOption
          onChange={() => this.props.setViewType(types.views.NOTHING)}
          checked={this.props.selectedView === types.views.NOTHING}
        >
          Nothing
        </MenuOption>

        <h2>Background image</h2>
        <button onClick={this.props.setRandomBackgroundImage}>
          Random image
        </button>
      </MenuWrapper>
    );
  }
}

const MenuWrapper = glamorous.section({
  boxSizing: "border-box",
  padding: s.grid(2),
  height: "100%",
  backdropFilter: s.blur.wide
});

class MenuOption extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
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
        />
        <MenuOptionText>{this.props.children}</MenuOptionText>
      </label>
    );
  }
}

const MenuOptionText = glamorous.span({
  ...s.fonts.medium,
  color: s.colors.white
});

export default Menu;
