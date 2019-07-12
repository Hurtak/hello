import { state } from "..";

export const debug = {
  //
  // State
  //

  rememberSettingsOpened: false,
  scheduledAppReset: false,

  //
  // Actions
  //

  toggleRememberSettingsOpened(): void {
    state.debug.rememberSettingsOpened = !state.debug.rememberSettingsOpened;
  },

  resetAppState(): void {
    state.debug.scheduledAppReset = true;
    state.storage.clear();
    window.location.reload();
  },
};
