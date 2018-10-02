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
      <>
        {hours}
        <Colon>:</Colon>
        {minutes}
        {this.props.showSeconds && (
          <>
            <Colon>:</Colon>
            {seconds}
          </>
        )}
      </>
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
  500: `@media (max-width: ${s.breakpointPxToEm(500)})`,
  380: `@media (max-width: ${s.breakpointPxToEm(380)})`,
  280: `@media (max-width: ${s.breakpointPxToEm(280)})`,
  180: `@media (max-width: ${s.breakpointPxToEm(180)})`
};

const ClockText = styled.div({
  ...s.text.text,
  ...s.text.familyMonospace,
  fontSize: s.gridPx(10),
  color: s.colors.white,
  opacity: s.opacity.default,

  [breakpoints[500]]: { fontSize: s.gridPx(8) },
  [breakpoints[380]]: { fontSize: s.gridPx(6) },
  [breakpoints[280]]: { fontSize: s.gridPx(4) },
  [breakpoints[180]]: { fontSize: s.gridPx(3) }
});

const Colon = styled.span({
  position: "relative",
  top: "-9px",
  margin: "0 -6px",
  fontSize: "0.8em",

  [breakpoints[500]]: {
    top: "-8px",
    margin: "0 -5px"
  },
  [breakpoints[380]]: {
    top: "-6px",
    margin: "0 -4px"
  },
  [breakpoints[280]]: {
    top: "-4px",
    margin: "0 -3px"
  },
  [breakpoints[180]]: {
    top: "-3px",
    margin: "0 -2px"
  }
});
