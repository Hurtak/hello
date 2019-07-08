import React from "react";
import renderer from "react-test-renderer";
import { getDaysInMonth, range } from "./utils";
import { Calendar } from "..";
import "jest-styled-components";

it("getDaysInMonth", () => {
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

it("range", () => {
  expect(range(0, 0)).toEqual([0]);
  expect(range(1, 3)).toEqual([1, 2, 3]);
  expect(range(-1, 1)).toEqual([-1, 0, 1]);
});

it.skip("Snapshot start of the year", () => {
  const element = <Calendar time={new Date(2017, 0, 1).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

it.skip("Snapshot end of the year", () => {
  const element = <Calendar time={new Date(2017, 11, 31, 23, 59, 59, 999).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

it.skip("Snapshot leap year start", () => {
  const element = <Calendar time={new Date(2012, 0, 1).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});

it.skip("Snapshot leap year end", () => {
  const element = <Calendar time={new Date(2012, 11, 31, 23, 59, 59, 999).getTime()} />;
  expect(renderer.create(element).toJSON()).toMatchSnapshot();
});
