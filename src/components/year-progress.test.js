import * as ConditionalUpdaterFunctions from './conditional-updater.js'

const { it, expect } = global

it('shouldBeUpdated', () => {
  // Zero update interval
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 10, 30, 0, 0),
      Date.UTC(2015, 0, 1, 10, 30, 0, 0),
      0
    )
  ).toBe(false)

  // Test edge cases
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 10, 30, 0, 999),
      Date.UTC(2015, 0, 1, 10, 30, 0, 0),
      1000
    )
  ).toBe(false)

  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 10, 30, 1, 0),
      Date.UTC(2015, 0, 1, 10, 30, 0, 0),
      1000
    )
  ).toBe(true)

  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 10, 30, 1, 0),
      Date.UTC(2015, 0, 1, 10, 30, 0, 999),
      1000
    )
  ).toBe(true)

  // Day interval
  const day = 24 * 60 * 60 * 1000
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 20, 21, 22, 666),
      Date.UTC(2015, 0, 1, 10, 11, 12, 555),
      day
    )
  ).toBe(false)
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 1, 23, 59, 59, 999),
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      day
    )
  ).toBe(false)

  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 2, 0, 0, 0, 0),
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      day
    )
  ).toBe(true)
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 0, 2, 0, 0, 0, 0),
      Date.UTC(2015, 0, 1, 23, 59, 59, 999),
      day
    )
  ).toBe(true)
  expect(
    ConditionalUpdaterFunctions.shouldBeUpdated(
      Date.UTC(2015, 5, 5, 0, 0, 0, 0),
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      day
    )
  ).toBe(true)
})
