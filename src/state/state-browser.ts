import { state } from "./state";

export const stateBrowser = {
  online: navigator.onLine
};

window.addEventListener("online", () => {
  state.browser.online = true;
});
window.addEventListener("offline", () => {
  state.browser.online = false;
});
