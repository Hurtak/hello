import React from 'react'
import propTypes from 'prop-types'

export default class ConditionarUpdater extends React.Component {
  static propTypes = {
    updateEveryN: propTypes.number.isRequired,
    component: propTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    const now = Date.now()
    const timer = setTimeout(() => {
      this.updateTimeAndStartTimeout()
    }, getNextTick(now, this.props.updateEveryN))

    this.timer = timer
    this.state = {
      time: now
    }
  }

  updateTimeAndStartTimeout = () => {
    const now = Date.now()

    const timer = setTimeout(
      this.updateTimeAndStartTimeout,
      getNextTick(now, this.props.updateEveryN)
    )

    this.timer = timer
    this.setState({
      time: now
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      clearTimeout(this.timer)
      this.updateTimeAndStartTimeout()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
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
