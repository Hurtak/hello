import { createStore, effect, select } from "easy-peasy";
import { getBingImageOfTheDay } from "../shared/api";
import * as time from "../shared/time";
import * as types from "../shared/types";
import { getRandomInt } from "../shared/random";
import images from "../images/images";

export interface IState {
  // Browser state
  online: boolean;

  // Menu states
  menuOpened: boolean;

  // Background image
  imageLocalIndex: number;
  imageBing: types.HttpData<{
    url: string;
    title?: string;
    link?: string;
    description: string;
  }>;

  // App settings
  selectedView: types.View;
  imageSource: types.ImageSource;
  clockShowSeconds: boolean;
  ageDateOfBirthTimestamp: number;
  ageDateOfBirthValue: string;
  settingsHidden: boolean;
}

const getInitialState = () => {
  const initialState: IState = {
    // Browser state
    online: navigator.onLine,

    // Menu states
    // menuOpened: false,
    menuOpened: true,

    // Background image
    imageLocalIndex: 0,
    imageBing: { type: "INITIAL" },

    // App settings
    selectedView: "CLOCK",
    imageSource: "LOCAL",
    clockShowSeconds: false,
    ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
    ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
    settingsHidden: false
  };

  return initialState;
};

export const store = createStore({
  app: {
    //
    // State
    //
    ...getInitialState(),

    //
    // Computed
    //
    imagesLocal: select(() => images),
    imageLocal: select((app: any) => app.imagesLocal[app.imageLocalIndex]),
    imageSourceWithFallback: select(
      (app: any): types.ImageSource | null => {
        switch (app.imageSource) {
          case "LOCAL":
            return "LOCAL";
          case "BING":
            if (!app.online) return "LOCAL";
            if (app.imageBing && app.imageBing.error === true) return "LOCAL";
            return "BING";
          default:
            return null;
        }
      }
    ),
    imageUrl: select((app: any) => {
      // TODO: maybe display cached image if it would be possible?
      const urlLocal = app.imageLocal.url;
      switch (app.imageSourceWithFallback) {
        case "LOCAL":
          return urlLocal;
        case "BING":
          switch (app.imageBing.type) {
            case "DONE":
              return app.imageBing.data.url;
            default:
              return null;
          }
        default:
          return null;
      }
    }),

    //
    // Effects
    //
    // saveTodo: effect(async (actions, payload) => {
    //   //                      👆
    //   // Notice that an effect will receive the actions allowing you to dispatch
    //   // other actions after you have performed your side effect.
    //   const saved = await todoService.save(payload);
    //   // 👇 Now we dispatch an action to add the saved item to our state
    //   actions.todos.todoSaved(saved);
    // }),
    appInit: effect(async (actions: any, payload: any, additional: any) => {
      const state = store.getState();

      // TODO: we should not acces state directly but in setState callback?
      // TODO: possible race condition if we switch settings multiple times?
      switch (state.app.imageSourceWithFallback) {
        case "LOCAL": {
          actions.app.setImageLocalRandom();
          break;
        }

        case "BING": {
          await store.dispatch.app.fetchImageBing();
          break;
        }

        default:
      }
    }),

    fetchImageBing: effect(async (actions: any) => {
      actions.imageBindFetch();
      const imageData = await getBingImageOfTheDay();
      actions.imageBindFetched(imageData);
    }),
    //
    // Actions
    //
    // add: (app: any, payload: any) => {
    //   app.todos.push(payload);
    // }
    imageBindFetch: (app: any) => {
      app.imageBing = { type: "FETCHING" };
    },
    imageBindFetched: (app: any, imageData: any) => {
      app.imageBing = imageData;
    },

    shiftImageLocalIndex: (app: any, direction: -1 | 1) => {
      let index = app.imageLocalIndex + direction;
      if (index > app.imagesLocal.length - 1) {
        index = 0;
      } else if (index < 0) {
        index = app.imagesLocal.length - 1;
      }

      app.imageLocalIndex = index;
    },

    setImageLocalRandom: (app: any) => {
      const numberOfImages = app.imagesLocal.length;

      const index = (() => {
        const getIndex = () => getRandomInt(0, numberOfImages - 1);

        if (numberOfImages < 2 || app.imageLocalIndex === null) {
          return getIndex();
        }

        while (true) {
          const index = getIndex();
          if (index !== app.imageLocalIndex) {
            return index;
          }
        }
      })();

      app.imageLocalIndex = index;
    },

    setImageLocalIndex: (app: any, index: number) => {
      app.imageLocalIndex = index;
    },

    toggleMenu: (app: any) => {
      app.menuOpened = !app.menuOpened;
    },
    setViewType: (app: any, selectedView: any) => {
      app.selectedView = selectedView;
    },
    setImageSource: (app: any, imageSource: any) => {
      app.imageSource = imageSource;
    },
    toggleClockShowSeconds: (app: any) => {
      app.clockShowSeconds = !app.clockShowSeconds;
    },
    setAgeDateOfBirth: (app: any, { inputValue, parsedTimestamp }: any) => {
      app.ageDateOfBirthValue = inputValue;
      if (parsedTimestamp) {
        app.ageDateOfBirthTimestamp = parsedTimestamp;
      }
    },
    toggleSettingsHidden: (app: any) => {
      app.settingsHidden = !app.settingsHidden;
    },

    resetAppState: (app: any) => {
      // clearLocalStorage();

      const initialState = getInitialState();
      for (const [key, value] of Object.entries(initialState)) {
        app[key] = value;
      }

      // window.location.reload();
    }
  }
});
