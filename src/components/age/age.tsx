import React from "react";
import styled from "styled-components/macro";
import { Timestamp } from "../timer-updater/timer-updater";
import * as s from "../../shared/styles";
import * as time from "../../shared/time";

type AgeProps = {
  time: Timestamp;
  birthDate: number;
  decimalPlaces: number;
};

export const Age = (props: AgeProps) => {
  const years = (props.time - props.birthDate) / time.year;

  return (
    <Wrapper>
      <AgePosition>
        <AgeBox>
          <AgeText>{years.toFixed(props.decimalPlaces)}</AgeText>
        </AgeBox>
      </AgePosition>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  position: "relative",
  flexGrow: 1,
  userSelect: "none"
});

const AgePosition = styled.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "15%",
  width: "100%"
});

const AgeBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  overflow: "hidden"
});

const AgeText = styled.div({
  ...s.text.text,
  ...s.text.familyMonospace,

  color: s.colors.white,
  opacity: s.opacity.default,
  fontSize: s.size(24),
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});
