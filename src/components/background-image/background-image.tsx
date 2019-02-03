import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

type BackgroundImageProps = {
  url: string | null;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previousUrl, setPreviousUrl] = useState(props.url);
  const [imageRenderNr, setImageRenderNr] = useState(1);

  useEffect(() => {
    const currentImageRenderNr = imageRenderNr;

    setImageLoaded(false);
    setPreviousUrl(previousUrl);
    if (!props.url) return;

    loadImage(props.url).then(() => {
      if (imageRenderNr !== currentImageRenderNr) return;

      setImageLoaded(true);
      setImageRenderNr(currentImageRenderNr + 1);
    });
  }, [props.url]);

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

function loadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = url;

    if (image.complete) {
      // image is already loaded in cache
      return resolve();
    } else {
      // image is not loaded yet
      image.onload = () => {
        resolve();
      };
      image.onerror = e => {
        reject(e);
      };
    }
  });
}

type ImageProps = {
  topImage?: boolean;
  imageLoaded: boolean;
  backgroundImage: string | null;
};

const Image = styled.div((props: ImageProps) => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: props.backgroundImage
    ? `url("${props.backgroundImage}")`
    : "none",
  transition: "opacity 0.3s ease",
  zIndex: props.topImage ? 2 : 1,
  opacity: props.imageLoaded ? 1 : 0
}));
