import styled from "styled-components/macro";

import * as s from "../../../../../../../styles";

export const Heading = styled.h1({
  ...s.text({ size: "HEADING" }),

  paddingBottom: s.grid(1),
});

export const HeadingSmall = styled.h2({
  ...s.text({ size: "HEADING_SMALL" }),

  paddingBottom: s.grid(1),
});

export const Text = styled.p({
  ...s.text(),
});
