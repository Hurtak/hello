import "jest-styled-components";

import renderer from "react-test-renderer";

import { Calendar } from "..";
import { getDaysInMonth } from "./utils";

test("getDaysInMonth", () => {
  expect(getDaysInMonth(2017, 1)).toBe(31);

  expect(getDaysInMonth(2012, 2)).toBe(29); // leap year
  expect(getDaysInMonth(2016, 2)).toBe(29); // leap year
  expect(getDaysInMonth(2017, 2)).toBe(28);

  expect(getDaysInMonth(2017, 3)).toBe(31);
  expect(getDaysInMonth(2017, 4)).toBe(30);
  expect(getDaysInMonth(2017, 5)).toBe(31);
  expect(getDaysInMonth(2017, 6)).toBe(30);
  expect(getDaysInMonth(2017, 7)).toBe(31);
  expect(getDaysInMonth(2017, 8)).toBe(31);
  expect(getDaysInMonth(2017, 9)).toBe(30);
  expect(getDaysInMonth(2017, 10)).toBe(31);
  expect(getDaysInMonth(2017, 11)).toBe(30);
  expect(getDaysInMonth(2017, 12)).toBe(31);
});

test.skip("Snapshot start of the year", () => {
  const element = <Calendar time={new Date(2017, 0, 1).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

test.skip("Snapshot end of the year", () => {
  const element = <Calendar time={new Date(2017, 11, 31, 23, 59, 59, 999).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

test.skip("Snapshot leap year start", () => {
  const element = <Calendar time={new Date(2012, 0, 1).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

test.skip("Snapshot leap year end", () => {
  const element = <Calendar time={new Date(2012, 11, 31, 23, 59, 59, 999).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});
