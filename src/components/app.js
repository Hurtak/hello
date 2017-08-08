import React from 'react'
import Clock from './clock.js'
import Calendar from './calendar.js'
import ConditionalUpdater from './conditional-updater.js'

class App extends React.Component {
  static config = {
    updateInterval: 200 // ms
  }

  state = {
    time: Date.now(),
    timer: null
  }

  componentDidMount () {
    const timer = setInterval(() => {
      this.setState({
        time: Date.now()
      })
    }, App.config.updateInterval)

    this.setState({
      timer: timer
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  render () {
    return (
      <div>
        <ConditionalUpdater
          time={this.state.time}
          updateEveryN={1000} // minute
        >
          <Clock />
        </ConditionalUpdater>
        <ConditionalUpdater
          time={this.state.time}
          updateEveryN={24 * 60 * 60 * 1000} // minute
        >
          <Calendar />
        </ConditionalUpdater>
      </div>
    )
  }
}

export default App
