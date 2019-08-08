import React from "react";
import { createGlobalStyle, css } from "styled-components/macro";
import { Normalize } from "styled-normalize";
import * as s from "./shared";

export const GlobalStyles = () => (
  <>
    <Normalize />
    <GlobalStylesComponent />
  </>
);

const GlobalStylesComponent = createGlobalStyle`
  ${css({
    body: {
      position: "relative", // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
      margin: 0,
      overscrollBehavior: "none",
      backgroundColor: s.colors.pageBackground,
    },
  })}
`;
