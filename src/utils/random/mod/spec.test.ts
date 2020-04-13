import { testItemsUniqueness } from "../../tests";
import { range } from "../../array";
import { uuid } from "..";

describe("uuid", () => {
  test("generates unique ids", () => {
    const ids = range(1, 20).map((_) => uuid());
    testItemsUniqueness(ids);
  });
});
