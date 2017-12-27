import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../styles/styles-shared.js";

const viewTypes = {
  CLOCK: "CLOCK",
  CALENDAR: "CALENDAR",
  YEAR_PROGRESS: "YEAR_PROGRESS",
  AGE: "AGE",
  NOTHING: "NOTHING"
};

class Menu extends React.Component {
  static propTypes = {
    selectedView: PropTypes.oneOf(Object.values(viewTypes)),
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
          onChange={() => this.props.setViewType(viewTypes.CALENDAR)}
          checked={this.props.selectedView === viewTypes.CALENDAR}
        >
          Calendar
        </MenuOption>
        <MenuOption
          onChange={() => this.props.setViewType(viewTypes.CLOCK)}
          checked={this.props.selectedView === viewTypes.CLOCK}
        >
          Clock
        </MenuOption>
        <MenuOption
          onChange={() => this.props.setViewType(viewTypes.NOTHING)}
          checked={this.props.selectedView === viewTypes.NOTHING}
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
