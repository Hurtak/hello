import React from "react";
import images from "../../images/images.js";

export default class ImageServiceLocal extends React.Component {
  static config = {
    savedState: ["imageIndex"]
  };

  constructor(props) {
    props.onInit({
      methods: {
        randomImage: this.randomImage,
        nextImage: () => this.shiftImageIndex(1),
        previousImage: () => this.shiftImageIndex(-1)
      }
    });
  }

  randomImage = () => {
    this.setImageIndex(prevState => {
      const numberOfImages = prevState.numberOfImages;

      const index = (() => {
        const getIndex = () => getRandomInt(0, numberOfImages - 1);

        if (numberOfImages < 2 || prevState.imageIndex === null) {
          return getIndex();
        }

        while (true) {
          const index = getIndex();
          if (index !== prevState.imageIndex) {
            return index;
          }
        }
      })();

      return index;
    });
  };

  shiftImageIndex = change => {
    this.setImageIndex(prevState => {
      let newIndex = prevState.imageIndex + change;
      if (newIndex > prevState.numberOfImages - 1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = prevState.numberOfImages - 1;
      }

      return newIndex;
    });
  };

  setImageIndex = cb => {
    this.setState(
      prevState => {
        const newIndex = cb(prevState);

        return {
          imageIndex: newIndex
        };
      },
      () => {
        const imageData = images[this.state.imageIndex];

        this.props.onImageChange({
          imageUrl: imageData.url,
          imageData: {
            imageIndex: this.state.imageIndex,
            numberOfImages: this.state.numberOfImages,
            ...imageData
          }
        });
      }
    );
  };

  componentDidMount() {
    this.randomImage();
  }
}
