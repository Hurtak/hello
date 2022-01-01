import { FC, useState, useEffect } from "react";
import { logWarning } from "../../utils/logging";
import { never } from "../../utils/never";
import * as s from "../../styles";
import { Wrapper, Image } from "./mod/styled";

type State = {
  image:
    | { type: "NO_IMAGE" }
    | { type: "ONE_IMAGE"; url: string }
    | { type: "TRANSITION_START"; url: string; urlOld: string | null }
    | { type: "TRANSITIONING"; url: string; urlOld: string | null };
  imageWaitingToStartTransition: string | null;
};

const initialImageState: State = {
  image: { type: "NO_IMAGE" },
  imageWaitingToStartTransition: null,
};

export const BackgroundImage: FC<{
  url: string | null;
}> = ({ url }) => {
  const [state, setState] = useState(initialImageState);

  useEffect(() => {
    if (url) {
      return loadImage(url, () => {
        setState((state) => ({
          ...state,
          imageWaitingToStartTransition: url,
        }));
      });
    } else {
      setState((state) => ({
        ...state,
        imageWaitingToStartTransition: null,
      }));
    }
  }, [url]);

  useEffect(() => {
    const { image, imageWaitingToStartTransition } = state;

    switch (image.type) {
      case "NO_IMAGE": {
        if (!imageWaitingToStartTransition) return;

        setState({
          image: {
            type: "TRANSITION_START",
            url: imageWaitingToStartTransition,
            urlOld: null,
          },
          imageWaitingToStartTransition: null,
        });
        return;
      }

      case "ONE_IMAGE": {
        if (!imageWaitingToStartTransition) return;

        setState({
          image: {
            type: "TRANSITION_START",
            url: imageWaitingToStartTransition,
            urlOld: image.url,
          },
          imageWaitingToStartTransition: null,
        });
        return;
      }

      case "TRANSITION_START": {
        const { url, urlOld } = image;

        const timeout = window.setTimeout(() => {
          setState((state) => ({
            ...state,
            image: {
              type: "TRANSITIONING",
              url,
              urlOld,
            },
          }));
        }, 100);
        return () => window.clearTimeout(timeout);
      }

      case "TRANSITIONING": {
        const { url } = image;

        const timeout = window.setTimeout(() => {
          setState((state) => ({
            ...state,
            image: {
              type: "ONE_IMAGE",
              url,
            },
          }));
        }, s.animation.backgroundImageAnimationDurationSeconds * 1000);
        return () => window.clearTimeout(timeout);
      }

      default: {
        never(image);
      }
    }
  }, [state]);

  switch (state.image.type) {
    case "NO_IMAGE":
      return (
        <Wrapper>
          <Image />
          <Image />
        </Wrapper>
      );

    case "TRANSITION_START":
      return (
        <Wrapper>
          <Image backgroundImage={state.image.urlOld} visible noAnimation />
          <Image backgroundImage={state.image.url} noAnimation />
        </Wrapper>
      );

    case "TRANSITIONING":
      return (
        <Wrapper>
          <Image backgroundImage={state.image.urlOld} visible noAnimation />
          <Image backgroundImage={state.image.url} visible />
        </Wrapper>
      );

    case "ONE_IMAGE":
      return (
        <Wrapper>
          <Image />
          <Image backgroundImage={state.image.url} visible />
        </Wrapper>
      );

    default: {
      return never(state.image);
    }
  }
};

type ImageLoadingState = "LOADING" | "DONE" | "ERROR" | "CANCELED";

function loadImage(url: string, loaded: () => void): () => void {
  let imageState: ImageLoadingState = "LOADING";

  const image = document.createElement("img");
  image.onload = () => {
    if (imageState === "CANCELED") return;

    imageState = "DONE";
    loaded();
  };

  image.onerror = (e) => {
    // Image load cancelling throws error event
    if (imageState === "CANCELED") return;

    logWarning("Could not load image", url, e);
    imageState = "ERROR";
  };
  image.src = url;

  if (image.complete) {
    // image is already loaded in cache
    imageState = "DONE";
    loaded();
  }

  return () => {
    if (imageState === "DONE") return;
    imageState = "CANCELED";

    // https://stackoverflow.com/questions/5278304/how-to-cancel-an-image-from-loading
    image.src = "";
  };
}
