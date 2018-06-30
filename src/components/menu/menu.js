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

    clockShowSeconds: PropTypes.bool.isRequired,
    onClockShowSecondsChange: PropTypes.func.isRequired,

    setViewType: PropTypes.func.isRequired,
    setRandomImage: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired
  };

  clockShowSecondsChange = e => {
    this.props.onClockShowSecondsChange(!this.props.clockShowSeconds);
  };

  render() {
    return (
      <MenuWrapper>
        <TabIndexHandler disableTabbing={!this.props.opened}>
          <ToggleButton
            onClick={this.props.toggleMenu}
            data-tabindexhandlerignore
          >
            <ToggleButtonIcon src={iconCog} rotate={this.props.opened} />
          </ToggleButton>

          <Heading>Hello Friend!</Heading>
          <Text>Something about this app</Text>

          <HeadingSmall>View type</HeadingSmall>

          <MenuOption
            onChange={() => this.props.setViewType(types.views.CLOCK)}
            checked={this.props.selectedView === types.views.CLOCK}
          >
            Clock
          </MenuOption>
          <section>
            <label>
              <input
                type="checkbox"
                checked={this.props.clockShowSeconds}
                onChange={this.clockShowSecondsChange}
              />
              Show seconds
            </label>
          </section>

          {/* <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.CALENDAR)}
            checked={this.props.selectedView === types.views.CALENDAR}
          >
            Calendar
          </MenuOption>
        </TabIndexHandler> */}

          {/* <TabIndexHandler disableTabbing={!this.props.opened}>
          <MenuOption
            onChange={() => this.props.setViewType(types.views.YEAR_PROGRESS)}
            checked={this.props.selectedView === types.views.YEAR_PROGRESS}
          >
            Year progress
          </MenuOption>
        </TabIndexHandler> */}

          <MenuOption
            onChange={() => this.props.setViewType(types.views.AGE)}
            checked={this.props.selectedView === types.views.AGE}
          >
            Age
          </MenuOption>

          <MenuOption
            onChange={() => this.props.setViewType(types.views.NOTHING)}
            checked={this.props.selectedView === types.views.NOTHING}
          >
            Nothing
          </MenuOption>

          <HeadingSmall>Background image</HeadingSmall>

          <button onClick={this.props.setRandomImage}>Random image</button>
        </TabIndexHandler>
      </MenuWrapper>
    );
  }
}

class TabIndexHandler extends React.Component {
  static propTypes = {
    disableTabbing: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
  };

  constructor() {
    super();

    this.wrapper = null;
    this.elements = [];
  }

  render() {
    return <div ref={el => (this.wrapper = el)}>{this.props.children}</div>;
  }

  gatherElements() {
    const elements = this.wrapper.querySelectorAll(
      "button, input, select, textarea"
    );

    this.elements = [...elements].map(el => {
      return {
        tabIndex: el.getAttribute("tabindex"),
        element: el
      };
    });
  }

  disableTabbing() {
    for (const { element } of this.elements) {
      if (element.hasAttribute("data-tabindexhandlerignore")) continue;

      element.setAttribute("tabindex", -1);
    }
  }

  enableTabbing() {
    for (const { element, tabIndex } of this.elements) {
      if (element.hasAttribute("data-tabindexhandlerignore")) continue;

      if (tabIndex) {
        element.setAttribute("tabindex", tabIndex);
      } else {
        element.removeAttribute("tabindex");
      }
    }
  }

  componentDidMount() {
    this.gatherElements();
    this.disableTabbing();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.disableTabbing !== this.props.disableTabbing) {
      if (this.props.disableTabbing) {
        this.disableTabbing();
      } else {
        this.enableTabbing();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.disableTabbing) {
      this.enableTabbing();
    }
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
    transition: "0.5s transform ease",
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

const MenuWrapper = glamorous.section({
  boxSizing: "border-box",
  position: "relative",
  padding: s.grid(2),
  overflow: "hidden",
  backgroundColor: s.colors.whiteTransparentDefault
});

class MenuOption extends React.Component {
  static propTypes = {
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
          name="menu-option"
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
