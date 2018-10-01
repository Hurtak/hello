import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import { addLeadingZero } from "../../shared/time.js";

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

export class Time extends React.Component {
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

const ClockBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  userSelect: "none",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

const breakpoints = {
  500: "@media (max-width: 500px)",
  380: "@media (max-width: 380px)",
  280: "@media (max-width: 280px)",
  180: "@media (max-width: 180px)"
};

const ClockText = styled.div({
  ...s.text.text,
  ...s.text.familyMonospace,
  fontSize: s.grid(10),
  color: s.colors.white,
  opacity: s.opacity.default,

  [breakpoints[500]]: { fontSize: s.grid(8) },
  [breakpoints[380]]: { fontSize: s.grid(6) },
  [breakpoints[280]]: { fontSize: s.grid(4) },
  [breakpoints[180]]: { fontSize: s.grid(3) }
});

const Colon = styled.span({
  position: "relative",
  top: s.size(-9),
  margin: `0 ${s.size(-6)}`,
  fontSize: "0.8em",

  [breakpoints[500]]: {
    top: s.size(-8),
    margin: `0 ${s.size(-5)}`
  },
  [breakpoints[380]]: {
    top: s.size(-6),
    margin: `0 ${s.size(-4)}`
  },
  [breakpoints[280]]: {
    top: s.size(-4),
    margin: `0 ${s.size(-3)}`
  },
  [breakpoints[180]]: {
    top: s.size(-3),
    margin: `0 ${s.size(-2)}`
  }
});
