import React from 'react'
import classnames from 'classnames'
import './calendar.css'

export default class Calendar extends React.Component {
  render () {
    const now = new Date(this.props.time)

    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()
    const currentDay = now.getDate()

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const monthNames = [
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

    const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

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
                {monthNumber}. {monthNames[monthNumber - 1]}
              </p>

              {(() => {
                const days = []
                const daysInMonth = getDaysInMonth(currentYear, monthNumber - 1)
                for (let i = 0; i < daysInMonth; i++) {
                  days.push(i + 1)
                }

                return (
                  <ul className='DayWrapper'>
                    {dayNames.map(dayName => {
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
                      const emptyItems = []
                      for (let i = 0; i < numberOfEmptyItems; i++) {
                        emptyItems.push(i)
                      }

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
