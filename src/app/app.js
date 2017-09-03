import React from 'react'
import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
// import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
import YearProgress from '../year-progress/year-progress.js'
import './app.css'

class App extends React.Component {
  static apiUrl = 'https://unsplash.it/{width}/{height}?random&gravity=center'

  state = {
    backgroundImage: window.localStorage.image || null
  }

  async fetchImage () {
    const url = App.apiUrl
      .replace('{width}', window.screen.width)
      .replace('{height}', window.screen.height)

    const dataUrl = await toDataURL(url)

    if (!window.localStorage.image) {
      this.setState({
        backgroundImage: dataUrl
      })
    }
    window.localStorage.image = dataUrl
  }

  async componentDidMount () {
    await this.fetchImage()
  }

  render () {
    return (
      <div
        className='App'
        style={{
          backgroundImage: `url("${this.state.backgroundImage}")`
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

function toDataURL (url, callback) {
  return new Promise((resolve, reject) => {
    var request = new window.XMLHttpRequest()
    request.responseType = 'blob'
    request.onload = () => {
      var fileReader = new window.FileReader()
      fileReader.onload = data => {
        resolve(data.target.result)
      }
      fileReader.readAsDataURL(request.response) // async call
    }

    request.open('get', url)
    request.send()
  })
}

export default App
