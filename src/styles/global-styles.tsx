import React from "react";
import { createGlobalStyle, css } from "styled-components/macro";
import { Normalize } from "styled-normalize";
import * as s from "./styles";

export const GlobalStyles = () => (
  <>
    <Normalize />
    <GlobalStylesComponent />
  </>
);

const fontLoadingStrategy = {
  fontDisplay: "block",
};

const GlobalStylesComponent = createGlobalStyle`
  ${css({
    body: {
      margin: 0,
      backgroundColor: s.colors.grayChrome,
      position: "relative", // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
    },
  })}

  /*
    Generated from https://google-webfonts-helper.herokuapp.com
  */

  /* roboto-regular - latin */
  @font-face {
    ${fontLoadingStrategy};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'), url('../fonts/roboto-v19-latin-regular.woff2') format('woff2');
  }
  /* roboto-500 - latin */
  @font-face {
    ${fontLoadingStrategy};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'), url('../fonts/roboto-v19-latin-500.woff2') format('woff2');
  }
  /* roboto-700 - latin */
  @font-face {
    ${fontLoadingStrategy};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('../fonts/roboto-v19-latin-700.woff2') format('woff2');
  }

  /* lato-regular - latin */
  @font-face {
    ${fontLoadingStrategy};
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url('../fonts/lato-v15-latin-regular.woff2') format('woff2');
  }
  /* lato-700 - latin */
  @font-face {
    ${fontLoadingStrategy};
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    src: local('Lato Bold'), local('Lato-Bold'), url('../fonts/lato-v15-latin-700.woff2') format('woff2');
  }
`;
