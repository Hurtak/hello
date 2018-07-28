import React from "react";
import PropTypes from "prop-types";
import images from "../../images/images.js";
import {
  initLocalStorage,
  saveToLocalStorage
} from "../../shared/local-storage.js";

export default class ImageServiceLocal extends React.Component {
  static propTypes = {
    onImageChange: PropTypes.func.isRequired
  };

  static config = {
    savedState: ["previousImageIndex"]
  };

  constructor(props) {
    super(props);

    this.state = initLocalStorage(ImageServiceLocal.config.savedState, {
      previousImageIndex: null
    });

    props.onInit({
      methods: {
        nextImage: this.imageChange
      }
    });
  }

  componentDidMount() {
    this.imageChange();
  }

  componentDidUpdate() {
    saveToLocalStorage(ImageServiceLocal.config.savedState, this.state);
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
