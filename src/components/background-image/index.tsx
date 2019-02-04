import React, { useState, useEffect } from "react";
import { Image } from "./styled";

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
