import React from "react";
import propTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";

class Age extends React.Component {
  static propTypes = {
    time: types.timePropType,
    birthDate: propTypes.number.isRequired,
    decimalPlaces: propTypes.number.isRequired
  };

  render() {
    const years = (this.props.time - this.props.birthDate) / time.year;

    return (
      <Wrapper>
        <AgePosition>
          <AgeBox>
            <AgeText>{years.toFixed(this.props.decimalPlaces)}</AgeText>
          </AgeBox>
        </AgePosition>
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div({
  position: "relative",
  flexGrow: "1",
  userSelect: "none"
});

const AgePosition = glamorous.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "15%",
  width: "100%"
});

const AgeBox = glamorous.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  overflow: "hidden"
});

const AgeText = glamorous.div({
  ...s.text.text,
  ...s.text.size18,
  ...s.text.familyMonospace,
  color: s.colors.white,
  opacity: s.opacity.default,
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

export default Age;
