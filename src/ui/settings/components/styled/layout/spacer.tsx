import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../styles";

type SpacerProps = {
  spacing?: number;
  horizontal?: boolean;
};

export const SpacedItems: React.FC<SpacerProps> = ({
  //
  spacing = 1,
  horizontal = false,
  children,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => {
        const spacerComponent =
          index > 0 ? (
            <Spacer key={`spacer-${index}`} horizontal={horizontal} spacing={spacing} />
          ) : null;

        return [spacerComponent, child];
      })}
    </>
  );
};

export const Spacer = styled.div(({ spacing: space = 1, horizontal = false }: SpacerProps) => ({
  display: horizontal ? "inline-block" : "block",

  ...(horizontal === true && {
    width: s.grid(space),
  }),
  ...(horizontal === false && {
    height: s.grid(space),
  }),
}));
