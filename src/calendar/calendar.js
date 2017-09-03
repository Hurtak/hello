import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
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
      <ul className='MonthWrapper'>
        {months.map(monthNumber => {
          return (
            <li
              className={classnames('Month', {
                'Month--selected': monthNumber === currentMonth
              })}
              key={monthNumber}
            >
              <h2 className='Month-name'>
                {monthNumber}. {Calendar.monthNames[monthNumber - 1]}
              </h2>

              {(() => {
                const daysInMonth = getDaysInMonth(currentYear, monthNumber)
                const days = range(1, daysInMonth)

                return (
                  <section className='DayWrapper'>
                    <header>
                      {Calendar.dayNames.map(dayName => {
                        return (
                          <div className='Day' key={dayName}>{dayName}</div>
                        )
                      })}
                    </header>

                    <div>
                      {(() => {
                        const day = new Date(currentYear, monthNumber - 1, 1)

                        // 0 - Su, 1 - Mo ...
                        let firstDayIndex = day.getDay()

                        // shift items that week starts with monday
                        firstDayIndex -= 1
                        if (firstDayIndex === -1) {
                          firstDayIndex = 6
                        }

                        const numberOfEmptyItems = firstDayIndex
                        const emptyItems = range(0, numberOfEmptyItems)

                        return emptyItems.map((item, index) => {
                          return <div className='Day' key={item} />
                        })
                      })()}

                      {days.map(dayNumber => {
                        const isCurrentDay =
                          monthNumber === currentMonth &&
                          dayNumber === currentDay

                        const isDayFromPast =
                          monthNumber < currentMonth ||
                          (monthNumber === currentMonth &&
                            dayNumber < currentDay)

                        return (
                          <div
                            className={classnames('Day', {
                              'Day--selected': isCurrentDay,
                              'Day--crossed': isDayFromPast
                            })}
                            key={dayNumber}
                          >
                            {dayNumber}
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )
              })()}
            </li>
          )
        })}
      </ul>
    )
  }
}

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
