import { images } from "./images";

it("all image objects have image", () => {
  for (let image of images) {
    expect("url" in image).toBeTruthy();
    expect(typeof image.url === "string").toBeTruthy();
    expect(image.url.length > 0).toBeTruthy();
  }
});

it("all image urls are unique", () => {
  const seenUrls = new Set();
  for (let image of images) {
    expect(seenUrls.has(image.url)).toBeFalsy();
    seenUrls.add(image.url);
  }
});

it("image urls have certain structure", () => {
  for (let image of images) {
    // url is already checked in different test
    expect("name" in image).toBeTruthy();
    expect(typeof image.name === "string" || image.name === null).toBeTruthy();

    expect("location" in image).toBeTruthy();
    expect(typeof image.location === "string" || image.location === null).toBeTruthy();

    expect("source" in image).toBeTruthy();
    expect(typeof image.source === "string" || image.source === null).toBeTruthy();
  }
});
