import * as ConditionalUpdaterFunctions from './conditional-updater.js'

const { it, expect } = global

it('getNextTick', () => {
  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      1000
    )
  ).toBe(1000)

  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 1),
      1000
    )
  ).toBe(999)

  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 999),
      1000
    )
  ).toBe(1)

  const day = 24 * 60 * 60 * 1000
  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      day
    )
  ).toBe(day)

  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0) + day / 2,
      day
    )
  ).toBe(day / 2)

  expect(
    ConditionalUpdaterFunctions.getNextTick(
      Date.UTC(2015, 0, 1, 23, 59, 59, 999),
      day
    )
  ).toBe(1)
})