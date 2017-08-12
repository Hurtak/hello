import React from 'react'
import classnames from 'classnames'
import './calendar.css'

export default class Calendar extends React.Component {
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

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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
              <p className='Month-name'>
                {monthNumber}. {Calendar.monthNames[monthNumber - 1]}
              </p>

              {(() => {
                const daysInMonth = getDaysInMonth(currentYear, monthNumber - 1)
                const days = range(daysInMonth, 1)

                return (
                  <ul className='DayWrapper'>
                    {Calendar.dayNames.map(dayName => {
                      return <li className='Day' key={dayName}>{dayName}</li>
                    })}

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
                      const emptyItems = range(numberOfEmptyItems)

                      return emptyItems.map((item, index) => {
                        return <li className='Day' key={item} />
                      })
                    })()}

                    {days.map(dayNumber => {
                      const isCurrentDay =
                        monthNumber === currentMonth && dayNumber === currentDay

                      const isDayFromPast =
                        monthNumber < currentMonth ||
                        (monthNumber === currentMonth && dayNumber < currentDay)

                      return (
                        <li
                          className={classnames('Day', {
                            'Day--selected': isCurrentDay,
                            'Day--crossed': isDayFromPast
                          })}
                          key={dayNumber}
                        >
                          {dayNumber}
                        </li>
                      )
                    })}
                  </ul>
                )
              })()}
            </li>
          )
        })}
      </ul>
    )
  }
}

function getDaysInMonth (year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function range (numberOfItems, offset = 0) {
  const items = []
  for (let i = 0; i < numberOfItems; i++) {
    items.push(i + offset)
  }
  return items
}
