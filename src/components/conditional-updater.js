import React from 'react'

export default class ConditionarUpdater extends React.Component {
  state = {
    timeConditionallyUpdated: this.props.time
  }

  componentWillReceiveProps (nextProps) {
    const update = shouldBeUpdated(
      nextProps.time,
      this.state.timeConditionallyUpdated,
      nextProps.updateEveryN
    )

    if (update) {
      this.setState({
        timeConditionallyUpdated: nextProps.time
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const update = shouldBeUpdated(
      nextProps.time,
      this.state.timeConditionallyUpdated,
      nextProps.updateEveryN
    )

    return update
  }

  render () {
    return (
      <section>
        {React.cloneElement(this.props.children, {
          time: this.state.timeConditionallyUpdated
        })}
      </section>
    )
  }
}

function shouldBeUpdated (currentTime, lastTime, updateEveryN) {
  const currentTimeRoundedToN =
    Math.floor(currentTime / updateEveryN) * updateEveryN
  const lastTimeRoundedToN = Math.floor(lastTime / updateEveryN) * updateEveryN

  return currentTimeRoundedToN !== lastTimeRoundedToN
}
