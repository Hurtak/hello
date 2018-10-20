import propTypes from "prop-types";

// Enviroment

export const isDev = process.env.NODE_ENV !== "production";

// App

export const viewTypes = {
  CLOCK: "CLOCK",
  // CALENDAR: "CALENDAR",
  // YEAR_PROGRESS: "YEAR_PROGRESS",
  AGE: "AGE",
  NOTHING: "NOTHING"
};

export const imageSourceTypes = {
  LOCAL: "LOCAL",
  BING: "BING"
};

export const corsProxyTypes = {
  CORS_ANYWHERE: "CORS_ANYWHERE",
  CODETABS: "CODETABS"
};

export const fetchErrorTypes = {
  FETCH_ERROR: "FETCH_ERROR",
  STATUS_NOT_200: "STATUS_NOT_200",
  ERROR_PARSING_BODY_TEXT: "ERROR_PARSING_BODY_TEXT",
  ERROR_PARSING_JSON: "ERROR_PARSING_JSON",
  ERROR: "ERROR",
  MISSING_DATA: "MISSING_DATA"
};

// Prop types

export const timePropType = propTypes.number.isRequired;
