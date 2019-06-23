import React, { useState, useEffect } from "react";
import { Wrapper, Image } from "./styled";
import { logWarning } from "../../utils/logging";

type BackgroundUrl = string | null;

type Backgrounds = {
  current: BackgroundUrl;
  previous: BackgroundUrl;
};

export const BackgroundImage: React.FC<{
  url: BackgroundUrl;
}> = props => {
  const backgrounds = usePreviousBackground(props.url);
  const imageLoaded = useImageLoaded(backgrounds);

  if (!backgrounds.current) return null;

  return (
    <Wrapper>
      <Image topImage backgroundImage={backgrounds.current} imageLoaded={imageLoaded} />
      {backgrounds.previous && backgrounds.current !== backgrounds.previous && (
        <Image backgroundImage={backgrounds.previous} imageLoaded />
      )}
    </Wrapper>
  );
};

function usePreviousBackground(newUrl: BackgroundUrl): Backgrounds {
  const [backgrounds, setBackgrounds] = useState<Backgrounds>({
    current: newUrl,
    previous: null,
  });

  useEffect(() => {
    if (backgrounds.current === newUrl) return;
    setBackgrounds(previousBackgrounds => ({
      current: newUrl,
      previous: previousBackgrounds.current,
    }));
  }, [newUrl, backgrounds]);

  return backgrounds;
}

function useImageLoaded(backgrounds: Backgrounds): boolean {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    if (!backgrounds.current) return;

    return loadImage(backgrounds.current, success => {
      if (!success) return;
      setImageLoaded(true);
    });
  }, [backgrounds]);

  return imageLoaded;
}

function loadImage(url: string, cb: (success: boolean) => void): () => void {
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

    logWarning("Could not load image", url, e);
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
