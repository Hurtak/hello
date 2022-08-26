import { logWarning } from "./logging";

// const bingImageUrlProxied = "http://localhost:3001/";
const bingImageUrlProxied = "https://hello-cors-proxy.onrender.com/";

type BingResponse = {
  images?: {
    url: string;
    title?: string;
    copyright?: string;
    copyrightLink?: string;
  }[];
};

export type BingData = {
  url: string;
  title?: string;
  link?: string;
  description?: string;
  copyright?: string;
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
      data: unknown;
    };

export async function getBingImageOfTheDay(): Promise<HttpData<BingData>> {
  let request = null;

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

  let responseRaw: BingResponse | undefined;
  try {
    responseRaw = JSON.parse(await request.text()) as BingResponse;
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
      url: `https://www.bing.com${imageData.url}`,
      title: imageData.title,
      link: (() => {
        const link = imageData.copyrightLink;
        if (!link) return;

        // Bing API has this string there for some reason
        // eslint-disable-next-line no-script-url
        if (link === "javascript:void(0)") return;

        return link;
      })(),
      description: (() => {
        const description = imageData.copyright;
        if (!description) return;

        // "Image description (© copyright)" => "Image description"
        return description.replace(/ \(©.+?\)/, "");
      })(),
      copyright: (() => {
        const description = imageData.copyright;
        if (!description) return;

        const match = description.match(/\(© (?<copyright>.+?)\)/);
        if (!match) return;

        const copyright =
          match.groups && match.groups.copyright ? match.groups.copyright : undefined;
        return copyright;
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
