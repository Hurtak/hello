import React from "react";
import styled from "styled-components";

interface IBackgroundImageProps {
  url: string;
}

interface IBackgroundImageState {
  imageLoaded: boolean;
  previousUrl: string | null;
}

export default class BackgroundImage extends React.Component<
  IBackgroundImageProps,
  IBackgroundImageState
> {
  constructor(props: IBackgroundImageProps) {
    super(props);

    this.state = {
      imageLoaded: false,
      previousUrl: props.url || null
    };
  }

  handleImageLoading(url: string, urlPrevious: string | null) {
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

  componentDidUpdate(prevProps: IBackgroundImageProps) {
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
          backgroundImage={(() => {
            if (!this.state.imageLoaded) return null;
            if (!this.props.url) return null;
            return this.props.url;
          })()}
          imageLoaded={this.state.imageLoaded}
        />
        {this.state.previousUrl && (
          <Image backgroundImage={this.state.previousUrl} imageLoaded />
        )}
      </>
    );
  }
}

interface IImageProps {
  topImage?: boolean;
  imageLoaded: boolean;
  backgroundImage: string | null;
}
const Image = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props: IImageProps) =>
    props.backgroundImage ? `url("${props.backgroundImage}")` : "none"};
  background-position: center;
  transition: opacity 0.3s ease;
  z-index: ${(props: IImageProps) => (props.topImage ? 2 : 1)};
  opacity: ${(props: IImageProps) => (props.imageLoaded ? 1 : 0)};
`;
