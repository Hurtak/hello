import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { corsProxyTypes, fetchErrorTypes } from "../../shared/types.js";
import { getCorsProxyUrl } from "../../shared/cors-proxy.js";

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
        title: image.title || null,
        description: (() => {
          const description = image.copyright;
          if (!description) return null;
          // "Image description (© copyright)" => "Image description"
          return description.replace(/ \(©.+?\)/, "");
        })(),
        link: image.copyrightlink
      }
    });
  };

  render() {
    return null;
  }
}

const bingImageUrl = (() => {
  // Some related docs: https://github.com/timothymctim/Bing-wallpapers
  // Locale (the "mkt" parameter) is determined automatically based on the IP address.

  const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
  bingImage.searchParams.set("format", "js"); // get JSON as response-type
  bingImage.searchParams.set("idx", "0"); // TODO: what is this?
  bingImage.searchParams.set("n", 1); // number of images

  return bingImage.toString();
})();

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
