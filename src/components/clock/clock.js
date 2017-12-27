import React from "react";
import * as types from "../../shared/types.js";

export default class Clock extends React.Component {
  static propTypes = {
    time: types.timePropType
  };

  render() {
    return <section>{formatTime(this.props.time)}</section>;
  }
}

export function formatTime(timestamp) {
  const date = new Date(timestamp);

  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  return `${hours}:${minutes}`;
}

export function addLeadingZero(input) {
  input = String(input);
  if (input.length < 2) {
    input = "0" + input;
  }

  return input;
}
