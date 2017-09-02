import React from 'react'
import renderer from 'react-test-renderer'
import Calendar, * as CalendarFunctions from './calendar.js'

const { it, expect } = global

it('getDaysInMonth', () => {
  expect(CalendarFunctions.getDaysInMonth(2017, 1)).toBe(31)

  expect(CalendarFunctions.getDaysInMonth(2012, 2)).toBe(29) // leap year
  expect(CalendarFunctions.getDaysInMonth(2016, 2)).toBe(29) // leap year
  expect(CalendarFunctions.getDaysInMonth(2017, 2)).toBe(28)

  expect(CalendarFunctions.getDaysInMonth(2017, 3)).toBe(31)
  expect(CalendarFunctions.getDaysInMonth(2017, 4)).toBe(30)
  expect(CalendarFunctions.getDaysInMonth(2017, 5)).toBe(31)
  expect(CalendarFunctions.getDaysInMonth(2017, 6)).toBe(30)
  expect(CalendarFunctions.getDaysInMonth(2017, 7)).toBe(31)
  expect(CalendarFunctions.getDaysInMonth(2017, 8)).toBe(31)
  expect(CalendarFunctions.getDaysInMonth(2017, 9)).toBe(30)
  expect(CalendarFunctions.getDaysInMonth(2017, 10)).toBe(31)
  expect(CalendarFunctions.getDaysInMonth(2017, 11)).toBe(30)
  expect(CalendarFunctions.getDaysInMonth(2017, 12)).toBe(31)
})

it('range', () => {
  expect(CalendarFunctions.range(0, 0)).toEqual([0])
  expect(CalendarFunctions.range(1, 3)).toEqual([1, 2, 3])
  expect(CalendarFunctions.range(-1, 1)).toEqual([-1, 0, 1])
})

it('snapshot', () => {
  const elements = (
    <div>
      <Calendar time={new Date(2017, 0, 1).getTime()} />
      <Calendar time={new Date(2017, 11, 31, 23, 59, 59, 999).getTime()} />

      {/* Leap years */}
      <Calendar time={new Date(2012, 0, 1).getTime()} />
      <Calendar time={new Date(2012, 11, 31, 23, 59, 59, 999).getTime()} />
      <Calendar time={new Date(2016, 0, 1).getTime()} />
      <Calendar time={new Date(2016, 11, 31, 23, 59, 59, 999).getTime()} />
    </div>
  )
  expect(renderer.create(elements).toJSON()).toMatchSnapshot()
})
