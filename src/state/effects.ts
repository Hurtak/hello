import { effect } from "easy-peasy";
import { getBingImageOfTheDay } from "../shared/api";
import { store } from "./app-state";

export const appInit = effect(
  async (actions: any, payload: any, getState: any) => {
    const state = getState();

    // TODO: we should not acces state directly but in setState callback?
    // TODO: possible race condition if we switch settings multiple times?
    switch (state.imageSourceWithFallback) {
      case "LOCAL": {
        actions.setImageLocalRandom();
        break;
      }

      case "BING": {
        await store.dispatch.fetchImageBing();
        break;
      }

      default:
    }
  }
);

export const fetchImageBing = effect(async (actions: any) => {
  actions.imageBindFetch();
  const imageData = await getBingImageOfTheDay();
  actions.imageBindFetched(imageData);
});
