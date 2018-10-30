import React from "react";
import styled from "styled-components";
import * as s from "../../shared/styles.js";
import * as time from "../../shared/time.js";
import * as types from "../../shared/types";

interface IAge {
  time: types.Time;
  birthDate: number;
  decimalPlaces: number;
}

const Age = (props: IAge) => {
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
export default Age;

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  user-select: none;
`;

const AgePosition = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 15%;
  width: 100%;
`;

const AgeBox = styled.div`
  padding: ${s.grid(2)} ${s.grid(2.5)};
  background-color: ${s.colors.whiteTransparentDefault};
  overflow: hidden;
`;

const AgeText = styled.div`
  ${s.text.text};
  ${s.text.familyMonospace};

  color: ${s.colors.white};
  opacity: ${s.opacity.default};
  font-size: ${s.size(24)};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
