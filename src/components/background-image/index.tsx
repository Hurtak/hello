import React, { useState, useEffect } from "react";
import { Image } from "./styled";

type Background = string | null;

type BackgroundImageProps = {
  url: Background;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previousUrl, setPreviousUrl] = useState<Background>(null);
  const [imageRenderNr, setImageRenderNr] = useState(1);

  useEffect(() => {
    const currentImageRenderNr = imageRenderNr;
    setImageLoaded(false);

    if (!props.url) return;

    loadImage(props.url).then(() => {
      if (imageRenderNr !== currentImageRenderNr) return;

      setImageLoaded(true);
      setPreviousUrl(props.url);
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
    image.onload = () => {
      resolve();
    };
    image.onerror = e => {
      reject(e);
    };

    image.src = url;
    if (image.complete) {
      // image is already loaded in cache
      return resolve();
    }
  });
}
