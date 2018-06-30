import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";

export default class Clock extends React.Component {
  static propTypes = {
    time: types.timePropType,
    showSeconds: PropTypes.bool
  };

  render() {
    return (
      <ClockBox>
        <ClockText>
          <Time time={this.props.time} showSeconds={this.props.showSeconds} />
        </ClockText>
      </ClockBox>
    );
  }
}

class Time extends React.Component {
  static propTypes = {
    time: types.timePropType,
    showSeconds: PropTypes.bool
  };

  render() {
    const date = new Date(this.props.time);

    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());

    return (
      <React.Fragment>
        {hours}
        <Colon>:</Colon>
        {minutes}
        {this.props.showSeconds && (
          <React.Fragment>
            <Colon>:</Colon>
            {seconds}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export function addLeadingZero(input) {
  input = String(input);
  while (input.length < 2) {
    input = "0" + input;
  }

  return input;
}

const ClockBox = glamorous.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  userSelect: "none",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

const ClockText = glamorous.div({
  ...s.text.text,
  ...s.text.size18,
  ...s.text.familyMonospace,
  fontSize: s.grid(10),
  color: s.colors.white,
  opacity: s.opacity.default
});

const Colon = glamorous.span({
  position: "relative",
  top: s.size(-6),
  margin: `0 ${s.size(-6)}`
});
