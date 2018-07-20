import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { corsProxyTypes, fetchErrorTypes } from "../../shared/types.js";

export default class ImageServiceBing extends React.Component {
  static propTypes = {
    onImageChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.imageChange();
  }

  imageChange = async () => {
    const imageData = await getBingImageOfTheDay();
    // TODO: if error

    const image = imageData.data;
    const urlBing = "https://www.bing.com";

    this.props.onImageChange({
      imageUrl: urlBing + image.url,
      imageData: {
        title: image.copyright,
        link: image.copyrightlink
      }
    });
  };

  render() {
    return null;
  }
}

const bingImageUrl = (() => {
  const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
  bingImage.searchParams.set("format", "js"); // get JSON as response-type
  bingImage.searchParams.set("idx", "0"); // TODO: what is this?
  bingImage.searchParams.set("n", 1); // number of images
  // TODO: different regions?
  bingImage.searchParams.set("mkt", "en-US"); // region

  return bingImage.toString();
})();

function getCorsProxyUrl(corsProxyType, proxedUrl) {
  switch (corsProxyType) {
    case corsProxyTypes.CORS_ANYWHERE:
      return `https://cors-anywhere.herokuapp.com/${proxedUrl}`;
    case corsProxyTypes.CODETABS:
      return `https://api.codetabs.com/cors-proxy/${encodeURIComponent(
        proxedUrl
      )}`;
    default:
      throw new Error(`Unknown corsProxyType: ${corsProxyType}`);
  }
}

async function getBingImageOfTheDay() {
  let request = null;

  const url = getCorsProxyUrl(corsProxyTypes.CODETABS, bingImageUrl);
  try {
    request = await fetch(url, {
      headers: { Accept: "application/json" }
    });
  } catch (error) {
    return makeError(fetchErrorTypes.FETCH_ERROR, error);
  }

  if (request.status !== 200) {
    let text = null;

    try {
      text = await request.text();
    } catch (error) {
      return makeError(fetchErrorTypes.ERROR_PARSING_RESPONSE, error);
    }

    return makeError(fetchErrorTypes.STATUS_NOT_200, {
      status: request.status,
      body: text
    });
  }

  let response = null;
  try {
    response = await request.json();
  } catch (error) {
    return makeError(fetchErrorTypes.ERROR_PARSING_RESPONSE, error);
  }

  const image = get(response, "images[0]");
  const dataValid = (() => {
    const url = get(image, "url");
    return typeof url === "string" && url.length > 0;
  })();
  if (!dataValid) {
    return makeError(fetchErrorTypes.MISSING_DATA, response);
  }

  return {
    error: false,
    data: image
  };
}

function makeError(type, data) {
  const res = {
    error: true,
    data: {
      errorType: type,
      errorData: data
    }
  };
  console.log(res);

  return res;
}
