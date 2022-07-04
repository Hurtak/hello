import { range } from "../../array";
import { testItemsUniqueness } from "../../tests";
import { uuid } from "..";

describe("uuid", () => {
  test("generates unique ids", () => {
    const ids = range(1, 20).map((_) => uuid());
    testItemsUniqueness(ids);
  });
});
