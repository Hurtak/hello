import { corsProxyTypes } from "./types.js";

export function getCorsProxyUrl(corsProxyType, proxedUrl) {
  switch (corsProxyType) {
    case corsProxyTypes.CODETABS:
      return `https://api.codetabs.com/cors-proxy/${encodeURIComponent(
        proxedUrl
      )}`;
    case corsProxyTypes.CORS_ANYWHERE:
      return `https://cors-anywhere.herokuapp.com/${proxedUrl}`;
    default:
      throw new Error(`Unknown corsProxyType: ${corsProxyType}`);
  }
}
