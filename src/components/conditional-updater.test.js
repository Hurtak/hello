import * as YearProgressFuntions from './year-progress.js'

const { it, expect } = global

it('shouldBeUpdated', () => {
  expect(
    YearProgressFuntions.getYearProgress(Date.UTC(2015, 0, 1, 0, 0, 0, 0))
  ).toBe(0)

  expect(
    YearProgressFuntions.getYearProgress(Date.UTC(2015, 5, 30, 23, 59, 59, 999))
  ).toBe(50)

  expect(
    YearProgressFuntions.getYearProgress(
      Date.UTC(2015, 11, 30, 23, 59, 59, 999)
    )
  ).toBe(99)
})
