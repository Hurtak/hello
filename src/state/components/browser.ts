import { state } from "..";

export const browser = {
  //
  // State
  //

  online: navigator.onLine,

  //
  // Init/Destroy
  //

  initialize() {
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
  },

  destroy() {
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
  },
};

function online() {
  state.browser.online = true;
}
function offline() {
  state.browser.online = false;
}
