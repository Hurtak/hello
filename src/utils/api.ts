import { logWarning } from "./logging";

type BingResponse = {
  images?: {
    url?: string;
    title?: string;
    copyright?: string;
    copyrightLink?: string;
  }[];
};

export type BingData = {
  url: string;
  title: string | null;
  link: string | null;
  description: string | null;
};

export type HttpData<Response> =
  | { type: "INITIAL" }
  | { type: "FETCHING" }
  | { type: "DONE"; data: Response }
  | {
      type: "ERROR";
      errorType:
        | "FETCH_ERROR"
        | "STATUS_NOT_200"
        | "STATUS_NOT_200_AND_ERROR_PARSING_RESPONSE"
        | "ERROR_PARSING_JSON"
        | "MISSING_DATA_IN_RESPONSE";
      data: any;
    };

type CorsProxyType = "CORS_ANYWHERE" | "CROSSORIGIN_ME" | "CODETABS";

export function getCorsProxyUrl(corsProxyType: CorsProxyType, proxedUrl: string): string {
  switch (corsProxyType) {
    case "CORS_ANYWHERE":
      return `https://cors-anywhere.herokuapp.com/${proxedUrl}`;
    case "CROSSORIGIN_ME":
      return `https://crossorigin.me/${proxedUrl}`;
    case "CODETABS":
      return `https://api.codetabs.com/cors-proxy/${encodeURIComponent(proxedUrl)}`;
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

export async function getBingImageOfTheDay(): Promise<HttpData<BingData>> {
  let request = null;

  const bingImageUrlProxied = getCorsProxyUrl("CORS_ANYWHERE", bingImageUrl);
  try {
    request = await fetch(bingImageUrlProxied, {
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "FETCH_ERROR",
      data: error,
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
        data: error,
      });
    }

    return httpDataWithLog({
      type: "ERROR",
      errorType: "STATUS_NOT_200",
      data: {
        status: request.status,
        body: text,
      },
    });
  }

  let responseRaw = null;
  try {
    responseRaw = await request.text();
    responseRaw = JSON.parse(responseRaw);
  } catch (error) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "ERROR_PARSING_JSON",
      data: {
        error,
        response: responseRaw,
      },
    });
  }

  const response: BingResponse = responseRaw;

  const imageData =
    response && Array.isArray(response.images) && response.images[0] ? response.images[0] : null;

  const dataValid = Boolean(
    imageData && typeof imageData.url === "string" && imageData.url.length > 0,
  );

  if (!imageData || !dataValid) {
    return httpDataWithLog({
      type: "ERROR",
      errorType: "MISSING_DATA_IN_RESPONSE",
      data: response,
    });
  }

  return httpDataWithLog({
    type: "DONE",
    data: {
      url: "https://www.bing.com" + imageData.url,

      title: imageData.title ? imageData.title : null,

      description: (() => {
        const description = imageData.copyright;
        if (!description) return null;

        // "Image description (© copyright)" => "Image description"
        return description.replace(/ \(©.+?\)/, "");
      })(),
      link: (() => {
        const link = imageData.copyrightLink;
        if (!link) return null;

        // eslint-disable-next-line no-script-url
        if (link === "javascript:void(0)") return null;

        return link;
      })(),
    },
  });
}

function httpDataWithLog(data: HttpData<BingData>): HttpData<BingData> {
  if (data.type === "ERROR") {
    logWarning("Error fetching data", data);
  }

  return data;
}
