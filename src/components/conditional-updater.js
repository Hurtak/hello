import React from 'react'

// TODO: instead of using the props.time and comparing it to current time
//       we could take a look at the updateEveryN and set timeouts aproprietly.

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
    // TODO: Are there any performance implications to cloneElement?
    //       Maybe we should redo the API?
    return (
      <section>
        {React.cloneElement(this.props.children, {
          time: this.state.timeConditionallyUpdated
        })}
      </section>
    )
  }
}

export function shouldBeUpdated (currentTime, lastTime, updateEveryN) {
  if (updateEveryN === 0) {
    return currentTime !== lastTime
  }

  const currentTimeRoundedToN =
    Math.floor(currentTime / updateEveryN) * updateEveryN
  const lastTimeRoundedToN = Math.floor(lastTime / updateEveryN) * updateEveryN

  return currentTimeRoundedToN !== lastTimeRoundedToN
}
