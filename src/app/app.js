import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'
import ConditionalUpdater from '../conditional-updater/conditional-updater.js'
import Clock from '../clock/clock.js'
import Calendar from '../calendar/calendar.js'
// import YearProgress from '../year-progress/year-progress.js'
import Age from '../age/age.js'
import * as styles from '../styles/styles.js'
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
      <AppWrapper
        style={{
          backgroundImage: `url("${this.state.backgroundImage}")`
        }}
      >
        <AppContent>
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
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: styles.grid(1),
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
  padding: styles.grid(2),
  height: '100%',
  background: styles.colors.whiteTransparentBright,
  boxShadow: `0 0px 3px 3px ${styles.colors.whiteTransparentDefault}`
})

const MenuButton = glamorous.button({
  position: 'absolute',
  left: styles.grid(1),
  top: styles.grid(1)
})

export default App
