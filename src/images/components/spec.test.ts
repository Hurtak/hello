import { testItemsUniqueness } from "../../utils/tests";
import { images, Image } from "..";

test.each([
  //
  "url",
  "source",
] as (keyof Image)[])("image '%s' are unique", dataAccessor => {
  const items = images.map(image => image[dataAccessor]);
  testItemsUniqueness(items);
});
