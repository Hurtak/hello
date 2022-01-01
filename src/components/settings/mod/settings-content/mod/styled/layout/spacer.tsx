import { Children, FC } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";

export const SpacedItems: FC<{
  spacing?: number;
  horizontal?: boolean;
}> = ({ spacing = 1, horizontal = false, children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => {
        const spacerComponent =
          index > 0 ? (
            <Spacer key={`spacer-${index}`} horizontal={horizontal} size={spacing} />
          ) : null;

        return [spacerComponent, child];
      })}
    </>
  );
};

export const Spacer: FC<{
  size?: number;
  horizontal?: boolean;
}> = ({ size = 1, horizontal = false }) => {
  return <SpacerComponent size={size} horizontal={horizontal} />;
};

const SpacerComponent = styled.div(
  ({ size, horizontal }: { size: number; horizontal: boolean }) => ({
    display: horizontal ? "inline-block" : "block",

    ...(horizontal === true && {
      width: s.grid(size),
    }),
    ...(horizontal === false && {
      height: s.grid(size),
    }),
  }),
);
