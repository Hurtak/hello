const corsProxy = "https://cors-anywhere.herokuapp.com";
// const corsProxy = "https://api.codetabs.com/cors-proxy";

const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
bingImage.searchParams.set("format", "js"); // get JSON as response-type
bingImage.searchParams.set("idx", "0"); // TODO: what is this?
bingImage.searchParams.set("n", 1); // number of images
bingImage.searchParams.set("mkt", "en-US"); // region

const bingImageUrl = bingImage.toString();

const errorTypes = {
  FETCH_ERROR: "FETCH_ERROR",
  STATUS_NOT_200: "STATUS_NOT_200",
  ERROR_PARSING_JSON: "ERROR_PARSING_JSON",
  MISSING_DATA: "MISSING_DATA"
};

export async function getRandomImage() {
  let request = null;

  try {
    request = await fetch(`${corsProxy}/${bingImageUrl}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  } catch (error) {
    const res = {
      error: true,
      errorType: errorTypes.FETCH_ERROR,
      data: error
    };
    console.log(res);
    return res;
  }
  console.log(request);

  if (request.status !== 200) {
    const text = await request.text(); // TODO: try catch this
    const res = {
      error: true,
      errorType: errorTypes.STATUS_NOT_200,
      data: {
        status: request.status,
        body: text
      }
    };
    console.log(res);
    return res;
  }

  let response = null;
  try {
    response = await request.json();
  } catch (error) {
    const res = {
      error: true,
      errorType: errorTypes.ERROR_PARSING_JSON,
      data: error
    };
    console.log(res);
    return res;
  }

  const imageUrl = (() => {
    if (!response) return null;
    if (!response.images) return null;
    if (!response.images[0]) return null;
    if (!response.images[0].url) return null;
    if (typeof response.images[0].url !== "string") return null;
    return "http://www.bing.com" + response.images[0].url;
  })();

  console.log(imageUrl);

  return {
    error: false,
    data: imageUrl
  };
}
