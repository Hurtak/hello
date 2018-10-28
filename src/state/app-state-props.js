import propTypes from "prop-types";
import * as constants from "../shared/constants.js";

const appStatePropTypes = propTypes.shape({
  state: propTypes.shape({
    // Menu states
    menuOpened: propTypes.bool.isRequired,

    // Background image
    imagesLocal: propTypes.arrayOf(
      propTypes.shape({
        url: propTypes.string.isRequired,
        name: propTypes.string,
        location: propTypes.string,
        source: propTypes.string.isRequired
      })
    ),
    imageLocal: propTypes.shape({
      index: propTypes.number.isRequired
    }),
    imageBing: propTypes.shape({
      url: propTypes.string.isRequired,
      title: propTypes.string,
      link: propTypes.string,
      description: propTypes.string.isRequired
    }),
    imageBingFetching: propTypes.bool.isRequired,

    // App settings
    selectedView: propTypes.oneOf(Object.values(constants.viewTypes))
      .isRequired,

    imageSource: propTypes.oneOf(Object.values(constants.imageSourceTypes)),

    clockShowSeconds: propTypes.bool.isRequired,

    ageDateOfBirthTimestamp: propTypes.number.isRequired,
    ageDateOfBirthValue: propTypes.string.isRequired,

    settingsHidden: propTypes.bool.isRequired
  }).isRequired
}).isRequired;

export default appStatePropTypes;
