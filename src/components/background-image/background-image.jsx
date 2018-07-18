import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

export default class BackgroundImage extends React.Component {
  static propTypes = {
    url: PropTypes.string
  };

  constructor(props) {
    super();

    this.state = {
      imageLoaded: false,
      previousUrl: props.url || null
    };
  }

  handleImageLoading(url) {
    if (!url) {
      this.setState({ imageLoaded: false });
      return;
    }

    const image = document.createElement("img");
    image.src = url;

    if (image.complete) {
      // browser finished downloading the image
      this.setState({ imageLoaded: true });
    } else {
      // image is not loaded yet
      image.onload = () => {
        this.setState({ imageLoaded: true });
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.handleImageLoading(this.props.url);
    }
  }

  componentDidMount() {
    this.handleImageLoading(this.props.url);
  }

  render() {
    return (
      <Image
        style={{
          backgroundImage: (() => {
            if (!this.state.imageLoaded) return null;
            if (!this.props.url) return null;
            return `url(${this.props.url})`;
          })(),
          opacity: this.state.imageLoaded ? 1 : 0
        }}
      />
    );
  }
}

const Image = glamorous.div({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  transition: "0.3s opacity ease"
});
