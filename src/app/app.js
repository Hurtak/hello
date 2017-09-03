import React from 'react'
import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
// import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
import YearProgress from '../year-progress/year-progress.js'
import './app.css'

class App extends React.Component {
  render () {
    return (
      <div
        className='App'
        style={{
          backgroundImage: `url("https://www.bing.com/az/hprichbg/rb/YellowNPFirehole_EN-US14008559204_1920x1080.jpg")`
        }}
      >
        <main className='App-content'>
          {/* <ConditionalUpdater
            updateEveryN={60 * 1000} // minute
            component={time => <Clock time={time} />}
          /> */}
          <ConditionalUpdater
            updateEveryN={24 * 60 * 60 * 1000} // day
            component={time => <Calendar time={time} />}
          />
          {(() => {
            const year = 365 * 24 * 60 * 60 * 1000
            const decimalPlaces = 8

            return (
              <ConditionalUpdater
                updateEveryN={year / 100 / 10 ** decimalPlaces}
                component={time => (
                  <YearProgress time={time} decimalPlaces={decimalPlaces} />
                )}
              />
            )
          })()}
        </main>
      </div>
    )
  }
}

export default App
