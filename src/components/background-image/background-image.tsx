import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface IBackgroundImageProps {
  url: string;
}

const BackgroundImage = (props: IBackgroundImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previousUrl, setPreviousUrl] = useState(props.url || null);

  useEffect(
    () => {
      // TODO raceconiditons right?
      // TODO completly all bad
      setImageLoaded(false);
      setPreviousUrl(previousUrl);
      if (!props.url) return;

      const image = document.createElement("img");
      image.src = props.url;

      if (image.complete) {
        // browser finished downloading the image
        setImageLoaded(true);
      } else {
        // image is not loaded yet
        image.onload = () => {
          // TODO: race condition when switching fast between images?
          setImageLoaded(true);
        };
      }
    },
    [props.url]
  );

  return (
    <>
      <Image
        topImage
        backgroundImage={(() => {
          if (!imageLoaded) return null;
          if (!props.url) return null;
          return props.url;
        })()}
        imageLoaded={imageLoaded}
      />
      {previousUrl && <Image backgroundImage={previousUrl} imageLoaded />}
    </>
  );
};
export default BackgroundImage;

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
