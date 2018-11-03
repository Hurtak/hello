export type Time = number;

export type View =
  | "CLOCK"
  // | "CALENDAR"
  // | "YEAR_PROGRESS"
  | "AGE"
  | "NOTHING";

export type ImageSource = "LOCAL" | "BING";

export type CorsProxyType = "CORS_ANYWHERE" | "CODETABS";

export type FetchErrorType =
  | "FETCH_ERROR"
  | "STATUS_NOT_200"
  | "STATUS_NOT_200_AND_ERROR_PARSING_RESPONSE"
  | "ERROR_PARSING_JSON"
  | "MISSING_DATA_IN_RESPONSE";

export type HttpData<Resp> =
  | {
      type: "INITIAL";
    }
  | {
      type: "FETCHING";
    }
  | {
      type: "DONE";
      data: Resp; // TODO
    }
  | {
      type: "ERROR";
      errorType: FetchErrorType;
      data: any; // TODO
    };
