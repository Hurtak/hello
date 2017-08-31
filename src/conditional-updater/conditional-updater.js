import React from 'react'
import propTypes from 'prop-types'

export default class ConditionarUpdater extends React.Component {
  static propTypes = {
    updateEveryN: propTypes.number.isRequired,
    component: propTypes.func.isRequired
  }

  state = {
    timer: null,
    time: null
  }

  constructor (props) {
    super(props)

    const now = Date.now()
    const timer = setTimeout(() => {
      this.updateTimeAndStartTimeout()
    }, getNextTick(now, this.props.updateEveryN))

    this.state = {
      timer: timer,
      time: now
    }
  }

  updateTimeAndStartTimeout = () => {
    const now = Date.now()

    const timer = setTimeout(
      this.updateTimeAndStartTimeout,
      getNextTick(now, this.props.updateEveryN)
    )

    this.setState({
      timer: timer,
      time: now
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      clearTimeout(this.state.timer)
      this.updateTimeAndStartTimeout()
    }
  }

  componentWillUnmout () {
    clearTimeout(this.state.timer)
  }

  render () {
    return (
      <section>
        {this.props.component(this.state.time)}
      </section>
    )
  }
}

export function getNextTick (now, updateEveryN) {
  return updateEveryN - now % updateEveryN
}
