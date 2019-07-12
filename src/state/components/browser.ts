import { state } from "..";

export const browser = {
  //
  // State
  //

  online: navigator.onLine,

  //
  // Init/Destroy
  //

  initialize(): void {
    window.addEventListener("online", () => {
      state.browser.online = true;
    });

    window.addEventListener("offline", () => {
      state.browser.online = false;
    });
  },
};
