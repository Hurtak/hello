import React from "react";
import styled from "styled-components/macro";
import { Timestamp } from "../timer-updater/timer-updater";
import * as s from "../../shared/styles";
import { addLeadingZero } from "../../shared/time";

type ClockProps = {
  time: Timestamp;
  showSeconds: boolean;
};

export const Clock = (props: ClockProps) => (
  <ClockBox>
    <ClockText>
      <TimeC time={props.time} showSeconds={props.showSeconds} />
    </ClockText>
  </ClockBox>
);

const TimeC = (props: ClockProps) => {
  const date = new Date(props.time);

  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  return (
    <>
      {hours}
      <Colon>:</Colon>
      {minutes}
      {props.showSeconds && (
        <>
          <Colon>:</Colon>
          {seconds}
        </>
      )}
    </>
  );
};

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

  [breakpoints[500]]: {
    fontSize: s.gridPx(8)
  },
  [breakpoints[380]]: {
    fontSize: s.gridPx(6)
  },
  [breakpoints[280]]: {
    fontSize: s.gridPx(4)
  },
  [breakpoints[180]]: {
    fontSize: s.gridPx(3)
  }
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
