import React from "react";

export default class Clock extends React.Component {
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
