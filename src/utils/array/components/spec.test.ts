import { range } from "..";

test("range", () => {
  expect(range(0, 0)).toEqual([0]);
  expect(range(1, 3)).toEqual([1, 2, 3]);
  expect(range(-1, 1)).toEqual([-1, 0, 1]);
});
