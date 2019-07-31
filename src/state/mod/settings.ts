import { timestampToDateInputValue } from "../../utils/time";
import { state } from "..";

type View =
  | "CLOCK"
  // | "CALENDAR"
  | "YEAR_PROGRESS"
  | "AGE"
  | "NOTHING";

const defaultDateOfBirth = new Date(1990, 0, 1).getTime();

export const settings = {
  //
  // State
  //

  opened: false,
  selectedView: "CLOCK" as View,
  clockShowSeconds: false,
  ageDateOfBirthTimestamp: defaultDateOfBirth,
  ageDateOfBirthInputValue: timestampToDateInputValue(defaultDateOfBirth),
  cleanVersion: false,

  //
  // Actions
  //

  toggleSettingsOpened(): void {
    state.settings.opened = !state.settings.opened;
  },

  closeSettings(): void {
    state.settings.opened = false;
  },

  setSelectedView(selectedView: View): void {
    state.settings.selectedView = selectedView;
  },

  toggleClockShowSeconds(): void {
    state.settings.clockShowSeconds = !state.settings.clockShowSeconds;
  },

  setAgeDateOfBirth({
    timestamp,
    inputValue,
  }: {
    timestamp: number | null;
    inputValue: string;
  }): void {
    state.settings.ageDateOfBirthInputValue = inputValue;
    if (timestamp) {
      state.settings.ageDateOfBirthTimestamp = timestamp;
    }
  },

  toggleCleanVersion(): void {
    state.settings.cleanVersion = !state.settings.cleanVersion;
  },
};
