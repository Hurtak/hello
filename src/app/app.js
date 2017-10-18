import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './app.css'
import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
import YearProgress from '../year-progress/year-progress.js'
import Age from '../age/age.js'
import * as global from '../styles/global.js'

// import img from '../img/moonlight.jpg'
import img from '../img/night.jpg'
// import img from '../img/47.jpg'

global.init()

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 8
  }

  state = {
    backgroundImage: img,
    menuOpened: false,
    selectedView: 'CALENDAR' // 'CALENDAR' | 'CLOCK' | 'NOTHING'
  }

  toggleMenuOpenedState = () => {
    this.setState(prevState => ({
      menuOpened: !prevState.menuOpened
    }))
  }

  setViewType = newViewType => {
    this.setState({
      selectedView: newViewType
    })
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
          {(() => {
            switch (this.state.selectedView) {
              case 'CALENDAR':
                const yearInMs = 365 * 24 * 60 * 60 * 1000
                return (
                  <div>
                    <ConditionalUpdater
                      updateEveryN={24 * 60 * 60 * 1000} // day
                      component={time => <Calendar time={time} />}
                    />
                    {/* <ConditionalUpdater
                      updateEveryN={
                        yearInMs /
                          100 /
                          10 ** App.config.yearProgressDecimalPlaces
                      }
                      component={time => (
                        <YearProgress
                          time={time}
                          decimalPlaces={App.config.yearProgressDecimalPlaces}
                        />
                      )}
                    /> */}
                    <ConditionalUpdater
                      updateEveryN={
                        yearInMs / 100 / 10 ** App.config.ageDecimalPlaces
                      }
                      component={time => (
                        <Age
                          time={time}
                          decimalPlaces={App.config.ageDecimalPlaces}
                        />
                      )}
                    />
                  </div>
                )

              case 'CLOCK':
                return (
                  <ConditionalUpdater
                    updateEveryN={60 * 1000} // minute
                    component={time => <Clock time={time} />}
                  />
                )

              case 'NOTHING':
                return null

              default:
                throw new Error('Unknown view')
            }
          })()}
        </main>

        <button className='MenuButton' onClick={this.toggleMenuOpenedState}>
          Settings
        </button>

        <aside
          className={classnames('App-menu', {
            'App-menu--opened': this.state.menuOpened
          })}
        >
          <section className='Menu'>
            <h1>Calendar</h1>
            <p>Something about this app</p>
            <h2>View type</h2>
            <MenuOption
              onChange={() => this.setViewType('CALENDAR')}
              checked={this.state.selectedView === 'CALENDAR'}
            >
              Calendar
            </MenuOption>
            <MenuOption
              onChange={() => this.setViewType('CLOCK')}
              checked={this.state.selectedView === 'CLOCK'}
            >
              Clock
            </MenuOption>
            <MenuOption
              onChange={() => this.setViewType('NOTHING')}
              checked={this.state.selectedView === 'NOTHING'}
            >
              Nothing
            </MenuOption>
          </section>
        </aside>
      </div>
    )
  }
}

class MenuOption extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <label>
        <input
          onChange={this.props.onChange}
          type='radio'
          name='menu-option'
          checked={this.props.checked}
        />
        {this.props.children}
      </label>
    )
  }
}

export default App
