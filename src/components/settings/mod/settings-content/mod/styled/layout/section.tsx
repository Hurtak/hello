import { FC, ReactNode } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";
import { HeadingSmall } from "./text";

export const Section: FC<{
  title: string;
  children: ReactNode;
}> = (props) => (
  <Wrapper>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </Wrapper>
);

const Wrapper = styled.section({
  marginTop: s.grid(2),
});
