import { state } from "../state";
import { timestampToDateInputValue } from "../../utils/time";

type View =
  | "CLOCK"
  // | "CALENDAR"
  | "YEAR_PROGRESS"
  | "AGE"
  | "NOTHING";

const initialDateOfBirth = new Date(1990, 0, 1).getTime();

export const settings = {
  //
  // State
  //

  opened: false,
  selectedView: "CLOCK" as View,
  clockShowSeconds: false,
  ageDateOfBirthTimestamp: initialDateOfBirth,
  ageDateOfBirthInputValue: timestampToDateInputValue(initialDateOfBirth),
  minimalistVersion: false,
  scheduledAppReset: false,

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

  toggleMinimalistVersion(): void {
    state.settings.minimalistVersion = !state.settings.minimalistVersion;
  },

  resetAppState(): void {
    state.settings.scheduledAppReset = true;
    state.storage.clear();
    window.location.reload();
  },
};
