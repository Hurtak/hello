import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
import YearProgress from '../year-progress/year-progress.js'
import Age from '../age/age.js'
import * as stylesShared from '../styles/styles-shared.js'

// import img from '../img/moonlight.jpg'
import light from '../img/night.jpg'
import dark from '../img/47.jpg'

const viewTypes = {
  CLOCK: 'CLOCK',
  CALENDAR: 'CALENDAR',
  YEAR_PROGRESS: 'YEAR_PROGRESS',
  AGE: 'AGE',
  NOTHING: 'NOTHING'
}

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 9
  }

  state = {
    backgroundImage: light,
    menuOpened: false,
    selectedView: viewTypes.YEAR_PROGRESS
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
    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour
    const year = 365 * day

    return (
      <AppWrapper
        style={{
          backgroundImage: `url("${this.state.backgroundImage}")`
        }}
        onClick={() => {
          this.setState(prevState => ({
            backgroundImage: prevState.backgroundImage === light ? dark : light
          }))
        }}
      >
        <AppContent>
          {(() => {
            switch (this.state.selectedView) {
              case viewTypes.CLOCK:
                return (
                  <ConditionalUpdater
                    updateEveryN={minute}
                    component={time => <Clock time={time} />}
                  />
                )

              case viewTypes.CALENDAR:
                return (
                  <ConditionalUpdater
                    updateEveryN={day}
                    component={time => <Calendar time={time} />}
                  />
                )

              case viewTypes.YEAR_PROGRESS:
                return (
                  <ConditionalUpdater
                    updateEveryN={
                      year / 100 / 10 ** App.config.yearProgressDecimalPlaces
                    }
                    component={time => (
                      <YearProgress
                        time={time}
                        decimalPlaces={App.config.yearProgressDecimalPlaces}
                      />
                    )}
                  />
                )

              case viewTypes.AGE:
                const birthDate = new Date(1991, 3, 20).getTime()

                return (
                  <ConditionalUpdater
                    updateEveryN={year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={birthDate}
                        decimalPlaces={App.config.ageDecimalPlaces}
                      />
                    )}
                  />
                )

              case viewTypes.NOTHING:
                return null

              default:
                throw new Error('Unknown view')
            }
          })()}
        </AppContent>

        <MenuButton onClick={this.toggleMenuOpenedState}>
          Settings
        </MenuButton>

        <AppMenu opened={this.state.menuOpened}>
          <Menu>
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
          </Menu>
        </AppMenu>
      </AppWrapper>
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

const AppWrapper = glamorous.div({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: stylesShared.grid(1),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  // Menu is overflowing and is hidden on the right side
  overflowX: 'hidden'
})

const AppContent = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1200px',
  width: '100%'
})

const AppMenu = glamorous.aside(
  {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '100%',
    width: '300px',
    height: '100%',
    transition: '0.5s all ease'
  },
  props => {
    if (props.opened) {
      return { transform: 'translateX(-100%)' }
    }
  }
)

const Menu = glamorous.section({
  boxSizing: 'border-box',
  padding: stylesShared.grid(2),
  height: '100%',
  background: stylesShared.colors.whiteTransparentBright,
  boxShadow: `0 0px 3px 3px ${stylesShared.colors.whiteTransparentDefault}`
})

const MenuButton = glamorous.button({
  position: 'absolute',
  left: stylesShared.grid(1),
  top: stylesShared.grid(1)
})

export default App
