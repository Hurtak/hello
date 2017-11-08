import React from "react";
import propTypes from "prop-types";
import glamorous from "glamorous";
import * as stylesShared from "../styles/styles-shared.js";

class Age extends React.Component {
  static propTypes = {
    birthDate: propTypes.number.isRequired,
    decimalPlaces: propTypes.number.isRequired
  };

  render() {
    const year = 365 * 24 * 60 * 60 * 1000;

    const tsNow = new Date().getTime();
    const years = (tsNow - this.props.birthDate) / year;

    return (
      <AgeWrapper>
        <AgeText>{years.toFixed(this.props.decimalPlaces)}</AgeText>
      </AgeWrapper>
    );
  }
}

const AgeWrapper = glamorous.div({
  marginTop: stylesShared.grid(1),
  padding: stylesShared.grid(2),
  backgroundColor: stylesShared.colors.whiteTransparentDefault,
  color: stylesShared.colors.white
});

const AgeText = glamorous.div({
  ...stylesShared.fonts.medium,
  textAlign: "center"
});

export default Age;
