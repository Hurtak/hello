import { testItemsUniqueness } from "../../utils/tests";
import { images, Image } from "..";

test.each([
  //
  (image: Image) => image.url,
  (image: Image) => image.source.url,
])("image '%s' are unique", (dataAccessor) => {
  const items = images.map((image) => dataAccessor(image));
  testItemsUniqueness(items);
});
