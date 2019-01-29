import { select } from "easy-peasy";
import images from "../images/images";
import * as types from "../shared/types";

export const imagesLocal = select(() => images);

export const imageLocal = select(
  (state: any) => state.imagesLocal[state.imageLocalIndex]
);

export const imageSourceWithFallback = select(
  (state: any): types.ImageSource | null => {
    switch (state.imageSource) {
      case "LOCAL":
        return "LOCAL";
      case "BING":
        if (!state.online) return "LOCAL";
        if (state.imageBing && state.imageBing.error === true) return "LOCAL";
        return "BING";
      default:
        return null;
    }
  }
);

export const imageUrl = select((state: any) => {
  // TODO: maybe display cached image if it would be possible?
  const urlLocal = state.imageLocal.url;
  switch (state.imageSourceWithFallback) {
    case "LOCAL":
      return urlLocal;
    case "BING":
      switch (state.imageBing.type) {
        case "DONE":
          return state.imageBing.data.url;
        default:
          return null;
      }
    default:
      return null;
  }
});
