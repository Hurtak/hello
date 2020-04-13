import { eventToAgeOfBirthValues } from "./utils";

describe("eventToAgeOfBirthValues", () => {
  test.each(["2019-10-30", "2019-01-01"])("valid input value '%s'", (input) => {
    const [y, m, d] = input.split("-").map(Number);
    const timestamp = Date.UTC(y, m - 1, d);
    expect(eventToAgeOfBirthValues(input)).toEqual({
      timestamp: timestamp,
      inputValue: input,
    });
  });

  test.each(["", "xxx"])("invalid input value '%s'", (input) => {
    expect(eventToAgeOfBirthValues(input)).toEqual({
      timestamp: null,
      inputValue: input,
    });
  });
});
