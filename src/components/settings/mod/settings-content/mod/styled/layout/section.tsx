import { FC } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";
import { HeadingSmall } from "./text";

export const Section: FC<{
  title: string;
}> = (props) => (
  <Wrapper>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </Wrapper>
);

const Wrapper = styled.section({
  marginTop: s.grid(2),
});
