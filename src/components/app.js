import React from 'react'
import ConditionalUpdater from './conditional-updater.js'
import Clock from './clock.js'
import Calendar from './calendar.js'
import YearProgress from './year-progress.js'
import image from '../img/01.jpg'
import './app.css'

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
      <main className='App' style={{ backgroundImage: `url("${image}")` }}>
        <ConditionalUpdater
          time={this.state.time}
          updateEveryN={60 * 1000} // minute
        >
          <Clock />
        </ConditionalUpdater>
        <ConditionalUpdater
          time={this.state.time}
          updateEveryN={24 * 60 * 60 * 1000} // day
        >
          <Calendar />
        </ConditionalUpdater>
        <ConditionalUpdater
          time={this.state.time}
          updateEveryN={24 * 60 * 60 * 1000} // year / 100
        >
          <YearProgress />
        </ConditionalUpdater>
      </main>
    )
  }
}

export default App
