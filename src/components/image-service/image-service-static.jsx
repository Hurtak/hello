import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import {
  corsProxyTypes,
  imageSourceTypes,
  fetchErrorTypes
} from "../../shared/types.js";
import images from "../../images/images.js";

export default class ImageService extends React.Component {
  static propTypes = {
    imageSource: PropTypes.oneOf(Object.values(imageSourceTypes)).isRequired,
    onImageChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // this.timer = setInterval(() => {
    //   this.imageChange();
    // }, 1000);
    this.state = {
      previousImageIndex: null
    };

    props.onInit({
      methods: {
        nextImage: this.imageChange
      }
    });
  }

  componentDidMount() {
    this.imageChange();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  imageChange = () => {
    const numberOfImages = images.length;

    const index = (() => {
      const getIndex = () => getRandomInt(0, numberOfImages - 1);

      if (numberOfImages < 2 || this.state.previousImageIndex === null) {
        return getIndex();
      }

      while (true) {
        const index = getIndex();
        if (index !== this.state.previousImageIndex) {
          return index;
        }
      }
    })();

    const imageData = images[index];

    this.setState({ previousImageIndex: index }, () => {
      this.props.onImageChange({
        imageUrl: imageData.url,
        imageData: {
          currentImageIndex: index,
          numberOfImages: numberOfImages,
          ...imageData
        }
      });
    });
  };

  render() {
    return null;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bingImageUrl = (() => {
  const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
  bingImage.searchParams.set("format", "js"); // get JSON as response-type
  bingImage.searchParams.set("idx", "0"); // TODO: what is this?
  bingImage.searchParams.set("n", 1); // number of images
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

  const urlImageOfTheDay = get(response, "images[0].url");
  if (!urlImageOfTheDay) {
    return makeError(fetchErrorTypes.MISSING_DATA, response);
  }

  const imageUrl = "https://www.bing.com" + urlImageOfTheDay;

  return {
    error: false,
    data: imageUrl
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
