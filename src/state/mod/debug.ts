import { config } from "../../config";
import { state } from "..";

export const debug = {
  //
  // State
  //

  devMenuVisible: config.isDev,
  rememberSettingsOpened: false,
  scheduledAppReset: false,

  //
  // Actions
  //

  hideDevMenu(): void {
    state.debug.devMenuVisible = false;
  },

  showDevMenu(): void {
    state.settings.opened = true;
    state.debug.devMenuVisible = true;
  },

  toggleRememberSettingsOpened(): void {
    state.debug.rememberSettingsOpened = !state.debug.rememberSettingsOpened;
  },

  resetAppState(): void {
    state.debug.scheduledAppReset = true;
    state.storage.clear();
    window.location.reload();
  },
};
