import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'
import * as styles from '../styles/styles.js'

export default class Calendar extends React.Component {
  static propTypes = {
    time: propTypes.number.isRequired
  }

  static monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  static dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  render () {
    const now = new Date(this.props.time)

    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()
    const currentDay = now.getDate()

    const months = range(1, 12)

    return (
      <MonthsWrapper>
        {months.map(monthNumber => {
          return (
            <Month selected={monthNumber === currentMonth} key={monthNumber}>
              <MonthName>
                {monthNumber}. {Calendar.monthNames[monthNumber - 1]}
              </MonthName>

              {(() => {
                const daysInMonth = getDaysInMonth(currentYear, monthNumber)
                const days = range(1, daysInMonth)

                return (
                  <DaysWrapper>
                    {Calendar.dayNames.map(dayName => {
                      return (
                        <Day heading key={dayName}>
                          {dayName}
                        </Day>
                      )
                    })}

                    {(() => {
                      const day = new Date(currentYear, monthNumber - 1, 1)

                      // 0 - Su, 1 - Mo ...
                      let firstDayIndex = day.getDay()

                      // shift items that week starts with monday
                      // 0 - Mo, 2 - Tu ...
                      firstDayIndex -= 1
                      if (firstDayIndex === -1) {
                        firstDayIndex = 6
                      }

                      const numberOfEmptyItems = firstDayIndex - 1
                      const emptyItems = range(0, numberOfEmptyItems)

                      return emptyItems.map((item, index) => {
                        return <Day key={item} />
                      })
                    })()}

                    {days.map(dayNumber => {
                      const isCurrentDay =
                        monthNumber === currentMonth && dayNumber === currentDay

                      const isDayFromPast =
                        monthNumber < currentMonth ||
                        (monthNumber === currentMonth && dayNumber < currentDay)

                      // TODO: crossed not used ATM
                      return (
                        <Day
                          selected={isCurrentDay}
                          crossed={isDayFromPast}
                          currentDay={isCurrentDay}
                          key={dayNumber}
                        >
                          {dayNumber}
                        </Day>
                      )
                    })}
                  </DaysWrapper>
                )
              })()}
            </Month>
          )
        })}
      </MonthsWrapper>
    )
  }
}

const MonthsWrapper = glamorous.ul({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gridGap: styles.grid(1),
  listStyleType: 'none',
  margin: 0,
  padding: 0
})

const Month = glamorous.li(
  {
    display: 'block',
    backgroundColor: styles.colors.whiteTransparentDimmed,
    padding: styles.grid(2)
  },
  props => ({
    backgroundColor: props.selected ? 'rgba(0, 0, 0, 0.6)' : null
  })
)

const MonthName = glamorous.h2({
  ...styles.fonts.medium,
  display: 'block',
  margin: 0,
  textAlign: 'center'
})

const DaysWrapper = glamorous.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, auto)',
  gridGap: `${styles.grid(1)} 0`,
  justifyContent: 'space-between',
  padding: 0,
  marginTop: styles.grid(2),
  listStyleType: 'none'
})

const Day = glamorous.div(
  {
    ...styles.fonts.medium
  },
  props => {
    let css = {}
    if (props.heading) {
      css = {
        ...css,
        fontWeight: 'bold'
      }
    }
    if (props.currentDay) {
      css = {
        ...css,
        fontWeight: 'bold'
      }
    }
    if (props.selected) {
      css = {
        ...css,
        position: 'relative',
        zIndex: 0,
        '::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: '-2px',
          top: '-4px',
          width: '22px',
          height: '22px',
          backgroundColor: 'orange',
          zIndex: -1
        }
      }
    }

    return css
  }
)

export function getDaysInMonth (year, month) {
  return new Date(year, month, 0).getDate()
}

export function range (start, end) {
  const items = []
  for (let i = start; i <= end; i++) {
    items.push(i)
  }
  return items
}
