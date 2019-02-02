import { state } from "./state";
import { View } from "../shared/types";
import { timestampToDateInputValue } from "../shared/time";

const initialDateOfBirth = Date.UTC(1990, 0, 1);

export const stateSettings = {
  menuOpened: false,
  selectedView: "CLOCK",
  clockShowSeconds: false,
  ageDateOfBirthTimestamp: initialDateOfBirth,
  ageDateOfBirthInputValue: timestampToDateInputValue(initialDateOfBirth),
  settingsHidden: false,
  scheduledAppReset: false,

  toggleMenu(): void {
    state.settings.menuOpened = !state.settings.menuOpened;
  },

  setSelectedView(selectedView: View): void {
    state.settings.selectedView = selectedView;
  },

  toggleClockShowSeconds(): void {
    state.settings.clockShowSeconds = !state.settings.clockShowSeconds;
  },

  setAgeDateOfBirth({
    ageDateOfBirthTimestamp,
    ageDateOfBirthInputValue
  }: {
    ageDateOfBirthTimestamp: number | null;
    ageDateOfBirthInputValue: string;
  }): void {
    state.settings.ageDateOfBirthInputValue = ageDateOfBirthInputValue;
    if (ageDateOfBirthTimestamp) {
      state.settings.ageDateOfBirthTimestamp = ageDateOfBirthTimestamp;
    }
  },

  toggleSettingsHidden(): void {
    state.settings.settingsHidden = !state.settings.settingsHidden;
  },

  resetAppState(): void {
    state.settings.scheduledAppReset = true;
    state.localStorage.clear();
    window.location.reload();
  }
};
