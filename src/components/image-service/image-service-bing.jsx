import React from "react";
import propTypes from "prop-types";
import { getBingImageOfTheDay } from "../../shared/api.js";

export default class ImageServiceBing extends React.Component {
  static propTypes = {
    onImageChange: propTypes.func.isRequired
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
