import propTypes from "prop-types";
import * as types from "../shared/constants.js";

const appStatePropTypes = propTypes.shape({
  state: propTypes.shape({
    menuOpened: propTypes.bool.isRequired,

    selectedView: propTypes.oneOf(Object.values(types.viewTypes)).isRequired,

    imageSource: propTypes.oneOf(Object.values(types.imageSourceTypes)),

    clockShowSeconds: propTypes.bool.isRequired,

    ageDateOfBirthTimestamp: propTypes.number.isRequired,
    ageDateOfBirthValue: propTypes.string.isRequired,

    settingsHidden: propTypes.bool.isRequired
  }).isRequired
}).isRequired;

export default appStatePropTypes;
