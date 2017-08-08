import React from 'react'

export default class Clock extends React.Component {
  render () {
    return (
      <section>
        {formatTime(this.props.time)}
      </section>
    )
  }
}

export function formatTime (timestamp) {
  const date = new Date(timestamp)

  const hours = addLeadingZero(String(date.getHours()))
  const minutes = addLeadingZero(String(date.getMinutes()))

  return `${hours}:${minutes}`
}

export function addLeadingZero (str) {
  if (str.length < 2) {
    str = '0' + str
  }
  return str
}
