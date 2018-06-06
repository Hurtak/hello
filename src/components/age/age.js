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
      <AgePosition>
        <AgePosition2>
          <AgeBox>
            <AgeText>{years.toFixed(this.props.decimalPlaces)}</AgeText>
          </AgeBox>
        </AgePosition2>
      </AgePosition>
    );
  }
}

const AgePosition = glamorous.div({
  position: "relative",
  flexGrow: 1
});

const AgePosition2 = glamorous.div({
  position: "absolute",
  bottom: "15%",
  width: "100%",
  textAlign: "center"
});

const AgeBox = glamorous.span({
  display: "inline-block",
  padding: s.grid(2),
  backgroundColor: s.colors.whiteTransparentDefault
});

const AgeText = glamorous.span({
  ...s.text.text,
  ...s.text.size16,
  ...s.text.familyMonospace,
  color: s.colors.white
});

export default Age;
