import { eventToAgeOfBirthValues } from "./utils";

describe("eventToAgeOfBirthValues", () => {
  test("valid input values", () => {
    const input = "2019-10-30";
    const timestamp = Date.UTC(2019, 10 - 1, 30);
    expect(eventToAgeOfBirthValues(input)).toEqual({
      timestamp: timestamp,
      inputValue: input,
    });
  });
});
