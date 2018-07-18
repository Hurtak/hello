import Unsplash from "unsplash-js";

export const unsplash = new Unsplash({
  applicationId:
    "cd83d15de30e4f6b38d2c9b7244a94e566897918adc4ec2443a7b4b63c13f7d0",
  secret: "24b1a9f07202e16997c870da7a6bf53ef0af99dde91317a18981da7b55e4afc9"
});

export async function getRandomImage(width, height) {
  let request = null;

  // TODO: ckeck the url, it has crop parameter, we probably do not want that.
  try {
    request = await unsplash.photos.getRandomPhoto({
      width: width,
      height: height
      // query: "Seal"
      // featured: true
    });
  } catch (error) {
    return {
      error: true,
      data: error
    };
  }

  if (request.status !== 200) {
    const text = await request.text();
    return {
      error: true,
      data: {
        status: request.status,
        body: text
      }
    };
  }

  // TODO: error handling
  const response = await request.json();

  return response;
}
