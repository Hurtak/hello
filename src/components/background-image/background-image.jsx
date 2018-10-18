import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

export default class BackgroundImage extends React.Component {
  static propTypes = {
    url: propTypes.string
  };

  constructor(props) {
    super();

    this.state = {
      imageLoaded: false,
      previousUrl: props.url || null
    };
  }

  handleImageLoading(url, urlPrevious) {
    this.setState(
      {
        imageLoaded: false,
        previousUrl: urlPrevious
      },
      () => {
        if (!url) return;

        const image = document.createElement("img");
        image.src = url;

        if (image.complete) {
          // browser finished downloading the image
          this.setState({ imageLoaded: true });
        } else {
          // image is not loaded yet
          image.onload = () => {
            // TODO: race condition when switching fast between images?
            this.setState({ imageLoaded: true });
          };
        }
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.handleImageLoading(this.props.url, prevProps.url);
    }
  }

  componentDidMount() {
    this.handleImageLoading(this.props.url, null);
  }

  render() {
    return (
      <>
        <Image
          topImage
          style={{
            backgroundImage: (() => {
              if (!this.state.imageLoaded) return null;
              if (!this.props.url) return null;
              return `url(${this.props.url})`;
            })(),
            opacity: this.state.imageLoaded ? 1 : 0
          }}
        />
        {this.state.previousUrl && (
          <Image
            style={{
              backgroundImage: `url(${this.state.previousUrl})`
            }}
          />
        )}
      </>
    );
  }
}

const Image = styled.div(
  {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "opacity 0.3s ease"
  },
  props => {
    if (props.topImage) {
      return {
        zIndex: 2
      };
    } else {
      return {
        zIndex: 1
      };
    }
  }
);
