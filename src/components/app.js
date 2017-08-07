import React from 'react'
import Clock from './clock.js'
import Calendar from './calendar.js'

class App extends React.Component {
  render () {
    return (
      <div>
        <Clock />
        <Calendar />
      </div>
    )
  }
}

export default App
