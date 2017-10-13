import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'
import classnames from 'classnames'
import Text from '../text/text.js'
import './calendar.css'

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
                <Text block size='medium' align='center'>
                  {monthNumber}. {Calendar.monthNames[monthNumber - 1]}
                </Text>
              </MonthName>

              {(() => {
                const daysInMonth = getDaysInMonth(currentYear, monthNumber)
                const days = range(1, daysInMonth)

                return (
                  <section className='DaysWrapper'>
                    {Calendar.dayNames.map(dayName => {
                      return (
                        <div className='Day' key={dayName}>
                          <Text block size='medium' bold>
                            {dayName}
                          </Text>
                        </div>
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
                        return <div className='Day' key={item} />
                      })
                    })()}

                    {days.map(dayNumber => {
                      const isCurrentDay =
                        monthNumber === currentMonth && dayNumber === currentDay

                      const isDayFromPast =
                        monthNumber < currentMonth ||
                        (monthNumber === currentMonth && dayNumber < currentDay)

                      return (
                        <div
                          className={classnames('Day', {
                            'Day--selected': isCurrentDay,
                            'Day--crossed': isDayFromPast
                          })}
                          key={dayNumber}
                        >
                          {/* Text now returns <p> element, this probably
                               should not be <p>. */}
                          <Text block size='medium' bold={isCurrentDay}>
                            {dayNumber}
                          </Text>
                        </div>
                      )
                    })}
                  </section>
                )
              })()}
            </Month>
          )
        })}
      </MonthsWrapper>
    )
  }
}

const grid = size => size * 8 + `px`
const colors = {
  grayMain: 'gray',
  grayChrome: '#f2f1f0',
  whiteTransparentDimmed: 'rgba(0, 0, 0, 0.2)',
  whiteTransparentDefault: 'rgba(0, 0, 0, 0.4)',
  whiteTransparentBright: 'rgba(0, 0, 0, 0.8)'
}

const MonthsWrapper = glamorous.ul({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gridGap: grid(1),
  listStyleType: 'none',
  margin: 0,
  padding: 0
})

const Month = glamorous.li(
  {
    display: 'block',
    backgroundColor: colors.whiteTransparentDimmed,
    padding: grid(2)
  },
  props => ({
    backgroundColor: props.selected ? 'rgba(0, 0, 0, 0.6)' : null
  })
)

const MonthName = glamorous.h2({
  margin: 0
})

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
