import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";

const Age = props => {
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
Age.propTypes = {
  time: types.timePropType,
  birthDate: propTypes.number.isRequired,
  decimalPlaces: propTypes.number.isRequired
};
export default Age;

const Wrapper = styled.div({
  position: "relative",
  flexGrow: "1",
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
