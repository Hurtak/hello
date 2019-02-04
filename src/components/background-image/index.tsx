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
    if (!props.url) return;

    const currentImageRenderNr = imageRenderNr;
    setImageLoaded(false);
    if (props.url !== previousUrl) {
      setPreviousUrl(props.url);
    }

    return loadImage(props.url, sucess => {
      if (!sucess) return;
      if (imageRenderNr !== currentImageRenderNr) return;

      setImageLoaded(true);

      setImageRenderNr(currentImageRenderNr + 1);
    });
  }, [props.url]);

  return (
    <>
      {props.url && (
        <Image topImage backgroundImage={props.url} imageLoaded={imageLoaded} />
      )}
      {previousUrl && props.url !== previousUrl && (
        <Image backgroundImage={previousUrl} imageLoaded />
      )}
    </>
  );
};

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
