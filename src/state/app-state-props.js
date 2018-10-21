import propTypes from "prop-types";
import * as types from "../shared/constants.js";

const appStatePropTypes = propTypes.shape({
  state: propTypes.shape({
    // Menu states
    menuOpened: propTypes.bool.isRequired,

    // Background image
    image: propTypes.oneOfType([
      // Image service local
      propTypes.shape({
        url: propTypes.string.isRequired,

        imageIndex: propTypes.number.isRequired,
        numberOfImages: propTypes.number.isRequired,

        name: propTypes.string,
        location: propTypes.string,
        source: propTypes.string
      }),

      // Image service Bing
      propTypes.shape({
        url: propTypes.string.isRequired,

        isFetching: propTypes.bool,

        title: propTypes.string,
        link: propTypes.string,
        description: propTypes.string.isRequired
      })
    ]),

    // App settings
    selectedView: propTypes.oneOf(Object.values(types.viewTypes)).isRequired,

    imageSource: propTypes.oneOf(Object.values(types.imageSourceTypes)),

    clockShowSeconds: propTypes.bool.isRequired,

    ageDateOfBirthTimestamp: propTypes.number.isRequired,
    ageDateOfBirthValue: propTypes.string.isRequired,

    settingsHidden: propTypes.bool.isRequired
  }).isRequired
}).isRequired;

export default appStatePropTypes;
