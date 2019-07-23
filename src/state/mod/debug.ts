import { config } from "../../config";
import { state } from "..";

export const debug = {
  //
  // State
  //

  debugMenuVisible: config.isDev,
  debugMenuScrollAnimationRequestNr: 0,
  rememberSettingsOpened: false,
  scheduledAppReset: false,

  //
  // Actions
  //

  hideDebugMenu(): void {
    state.debug.debugMenuVisible = false;
  },

  showDebugMenu(): void {
    state.settings.opened = true;
    state.debug.debugMenuVisible = true;
    state.debug.debugMenuScrollAnimationRequestNr++;
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
