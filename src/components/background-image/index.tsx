import React, { useState, useEffect, useRef } from "react";
import { Image } from "./styled";

type BackgroundUrl = string | null;

type Backgrounds = {
  current: BackgroundUrl;
  previous: BackgroundUrl;
};

type BackgroundImageProps = {
  url: BackgroundUrl;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const backgrounds = usePreviousBackground(props.url);
  const imageLoaded = useImageLoaded(backgrounds);

  if (!backgrounds.current) return null;

  return (
    <>
      <Image
        topImage
        backgroundImage={backgrounds.current}
        imageLoaded={imageLoaded}
      />
      {backgrounds.previous && backgrounds.current !== backgrounds.previous && (
        <Image backgroundImage={backgrounds.previous} imageLoaded />
      )}
    </>
  );
};

function usePreviousBackground(newUrl: BackgroundUrl): Backgrounds {
  const [backgrounds, setBackgrounds] = useState<Backgrounds>({
    current: newUrl,
    previous: null
  });

  useEffect(() => {
    if (backgrounds.current === newUrl) return;
    setBackgrounds(previousBackgrounds => ({
      current: newUrl,
      previous: previousBackgrounds.current
    }));
  }, [newUrl]);

  return backgrounds;
}

function useImageLoaded(backgrounds: Backgrounds): boolean {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageRenderNr, setImageRenderNr] = useState(1);

  useEffect(() => {
    const currentImageRenderNr = imageRenderNr;
    setImageLoaded(false);

    if (!backgrounds.current) return;

    return loadImage(backgrounds.current, sucess => {
      if (!sucess) return;
      if (imageRenderNr !== currentImageRenderNr) return;
      setImageLoaded(true);
      setImageRenderNr(currentImageRenderNr + 1);
    });
  }, [backgrounds.current]);

  return imageLoaded;
}

function loadImage(url: string, cb: (sucess: boolean) => void): () => void {
  let imageLoaded = false;
  let imageCanceled = false;

  const image = document.createElement("img");
  image.onload = () => {
    if (imageLoaded) return;
    imageLoaded = true;
    cb(true);
  };
  image.onerror = e => {
    // Image load cancelling throws error event
    if (imageCanceled) return;

    console.warn("Could not load image", url, e);
    if (imageLoaded) return;
    imageLoaded = true;
    cb(false);
  };
  image.src = url;

  if (image.complete) {
    // image is already loaded in cache
    imageLoaded = true;
    cb(true);
  }

  return () => {
    if (imageLoaded) return;
    imageCanceled = true;

    // https://stackoverflow.com/questions/5278304/how-to-cancel-an-image-from-loading
    image.src = "";
  };
}
