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
          <AgeBox>{years.toFixed(this.props.decimalPlaces)}</AgeBox>
        </AgePosition>
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div({
  position: "relative",
  flexGrow: "1"
});

const AgePosition = glamorous.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "15%",
  width: "100%"
});

const AgeBox = glamorous.div({
  ...s.text.text,
  ...s.text.size16,
  ...s.text.familyMonospace,
  display: "inline-block",
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  color: s.colors.white,
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

export default Age;
