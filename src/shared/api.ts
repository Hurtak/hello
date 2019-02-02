import get from "lodash/get";
import { CorsProxyType, HttpData } from "./types";

export function getCorsProxyUrl(
  corsProxyType: CorsProxyType,
  proxedUrl: string
): string {
  switch (corsProxyType) {
    case "CODETABS":
      return `https://api.codetabs.com/cors-proxy/${encodeURIComponent(
        proxedUrl
      )}`;
    case "CORS_ANYWHERE":
      return `https://cors-anywhere.herokuapp.com/${proxedUrl}`;
    default:
      throw new Error(`Unknown corsProxyType: ${corsProxyType}`);
  }
}

export const bingImageUrl = (() => {
  // Some related docs: https://github.com/timothymctim/Bing-wallpapers
  // Locale (the "mkt" parameter) is determined automatically based on the IP address.

  const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
  bingImage.searchParams.set("format", "js"); // get JSON as response-type
  bingImage.searchParams.set("idx", "0"); // TODO: what is this?
  bingImage.searchParams.set("n", "1"); // number of images

  return bingImage.toString();
})();

export async function getBingImageOfTheDay() {
  let request = null;

  const url = getCorsProxyUrl("CODETABS", bingImageUrl);
  try {
    request = await fetch(url, {
      headers: { Accept: "application/json" }
    });
  } catch (error) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "FETCH_ERROR",
      data: error
    });
  }

  if (request.status !== 200) {
    let text = null;

    try {
      text = await request.text();
    } catch (error) {
      return httpDataWithLog({
        type: "ERROR",
        errorType: "STATUS_NOT_200_AND_ERROR_PARSING_RESPONSE",
        data: error
      });
    }

    return httpDataWithLog({
      type: "ERROR",
      errorType: "STATUS_NOT_200",
      data: {
        status: request.status,
        body: text
      }
    });
  }

  let response = null;
  try {
    response = await request.json();
  } catch (error) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "ERROR_PARSING_JSON",
      data: error
    });
  }

  const imageData = get(response, "images[0]");
  const dataValid = (() => {
    const url = get(imageData, "url");
    return typeof url === "string" && url.length > 0;
  })();
  if (!dataValid) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "MISSING_DATA_IN_RESPONSE",
      data: response
    });
  }

  return httpDataWithLog({
    type: "DONE",
    data: {
      url: "https://www.bing.com" + imageData.url,

      title: imageData.title || null,
      description: (() => {
        const description = imageData.copyright;
        if (!description) return null;
        // "Image description (© copyright)" => "Image description"
        return description.replace(/ \(©.+?\)/, "");
      })(),
      link: (() => {
        const link = imageData.copyrightlink;
        if (!link) return null;

        // eslint-disable-next-line no-script-url
        if (link === "javascript:void(0)") return null;
        return link;
      })()
    }
  });
}

// TODO: no any?
function httpDataWithLog(data: HttpData<any>): HttpData<any> {
  if (data.type === "ERROR") {
    console.warn("Error fetching data", data);
  }

  return data;
}
