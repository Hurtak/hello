import * as types from "../shared/types";
import { HttpData } from "../shared/api";

export default interface IAppStateProps {
  state: {
    // Menu states
    menuOpened: boolean;

    // Background image
    imageLocalIndex: number;
    imageBing: HttpData<{
      url: string;
      title?: string;
      link?: string;
      description: string;
    }>;
    imageBingFetching: boolean;

    // App settings
    selectedView: types.View;
    imageSource: types.ImageSource;

    clockShowSeconds: boolean;

    ageDateOfBirthTimestamp: number;
    ageDateOfBirthValue: string;

    settingsHidden: boolean;
  };
}
