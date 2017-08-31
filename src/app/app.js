import React from 'react'
import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
import YearProgress from '../year-progress/year-progress.js'
import './app.css'

class App extends React.Component {
  render () {
    return (
      <main
        className='App'
        style={{
          backgroundImage: `url("https://www.bing.com/az/hprichbg/rb/YellowNPFirehole_EN-US14008559204_1920x1080.jpg")`
        }}
      >
        <ConditionalUpdater
          updateEveryN={60 * 1000} // minute
          component={time => <Clock time={time} />}
        />
        <ConditionalUpdater
          updateEveryN={24 * 60 * 60 * 1000} // day
          component={time => <Calendar time={time} />}
        />
        <ConditionalUpdater
          updateEveryN={24 * 60 * 60 * 1000} // year / 100
          component={time => <YearProgress time={time} />}
        />
      </main>
    )
  }
}

export default App
