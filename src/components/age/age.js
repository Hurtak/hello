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
      <AgeWrapper>
        <AgeText>{years.toFixed(this.props.decimalPlaces)}</AgeText>
      </AgeWrapper>
    );
  }
}

const AgeWrapper = glamorous.div({
  marginTop: s.grid(1),
  padding: s.grid(2),
  backgroundColor: s.colors.whiteTransparentDefault,
  color: s.colors.white
});

const AgeText = glamorous.div({
  ...s.text.text,
  ...s.text.medium,
  textAlign: "center"
});

export default Age;
