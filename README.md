# Hello

- Chrome extension that replaces new tab page with widgets and fresh image every day.
- Live example: https://hello-extension.netlify.com
- Chrome store link: https://chrome.google.com/webstore/detail/hello/olenfgbgcphkaipfeohfjpagibimmpke

## Development

- install `npm ci`
- run in development mode `npm run start`
- run tests, type check and prettier check `npm run validate`
- build `npm run build`

## Release

- check if `CHANGELOG.md` is properly filled, add current date to the latest version
- up versions in `CHANGELOG.md`, `package.json` and `manifest.json`
- run `node ./scripts/release.js`

## Random notes

- Chrome CSP
  - Because of Chrome plugins CSP policy we cannot have inline scripts unless we mention their sha256+base64 value in `manifest.json` in `content_security_policy` field. Create React App includes some inline scripts by default so we would either need to have some build pipeline that extracts these scripts value and ads its sha256+base64 into manifest.json or we could use `INLINE_RUNTIME_CHUNK=false` environment variable that puts these scripts into external file.
  - Another inline script is `window.GLOBAL_PERF_TIMESTAMP = Date.now();` that is used for performance measuring. This one is added manually into `manifest.json`. Side note: `performance.timeOrigin` seemed to return wrong timings, investigate further in the future
- Create React App does not support testing files that have name `test.ts`, only files with `*.test.ts` or `*.spec.ts` patterns, so we go around this by calling tests `spec.test.ts`
- Global state is available in dev mode on `window._state`.

## Dependencies

- There was an error trying to load the config "styledComponents" for the macro imported from "styled-components/macro. Please see the error thrown for more information
  - https://github.com/styled-components/styled-components/issues/2713
  - Used to happen when we updated react-scripts 3.0.1 -> 3.1.0, now it happens when we regenerate package-lock, so some of the sub-dependencies is now also affected
- @types/styled-components 4.1.8 ❯ 4.1.16
  - typings completely broken
  - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311
- typescript 3.4.5 ❯ 3.5.2
  - WARNING: You are currently running a version of TypeScript which is not officially supported by typescript-estree
  - SUPPORTED TYPESCRIPT VERSIONS: >=3.2.1 <3.5.0
- @types/css-font-loading-module
  - once window.FontFace becomes standardized, remove
- resize-observer-polyfill
  - remove polyfill, once supported by browsers
- wicg-inert
  - remove polyfill, once supported by browsers
- focus-visible
  - remove polyfill, once supported by browsers
  - remove `.focus-visible` class and use directly `:focus-visible`

## Attributions

- Icon by [Alice Noir](https://thenounproject.com/AliceNoir/uploads/?i=576432) with slight modifications by me.

## Potential future improvements

- add calendar widget
- add another image providers?
  - https://chrome.google.com/webstore/detail/telescope/mcbkdemjpfgkelnhcnbkoafaljnblcjd
  - https://chrome.google.com/webstore/detail/new-tab-art/oldcmmikbakmkmikgikndeekekdihgnf
  - https://github.com/Hurtak/hello/issues/1
- release as Firefox plugin

## TODO

- chrome store
  - images without settings button
- cors proxy
  - on now
  - on heroku?
- fonts
  - precise cap-height boundaries for fonts
  - Text component?
- hotkeys (esc) do not work when input is focused
  - https://github.com/JohannesKlauss/react-hotkeys-hook/issues/127
- release on reddit
- when settings has focus, show it on minimalist view
- hotkeys to toggle calendar/time
  - write about it in settings
- show changelog somewhere in menu
- show location and links somewhere else and somewhere more visible accessible?
  - main reasoning: you will use the settings once at the beginning, then you will only look what is on the picture etc
- decimal places in age configurable
- animations
  - use react-spring
  - animate view transitions
  - animate menu height
  - also menu bugs
    - no when menu height content is extended, it lags behind content
    - when menu height content is collapsed, it happens instantly
  - animate text appear/disappear in menu
- background image switching seems slow and buggy sometimes
- images
  - bing image of the day
    - download once a hour?
    - what happens when we have outdated data?
    - display new image on subsequent page visits?
  - error handling
    - show error when image cannot be loaded
    - backup background when image cannot be loaded
    - when no internet auto fallback to offline images?
    - when no internet disable menu settings and show error message
- fix tests
- resolve all todos in code
- conditional updated is broken when we change clocks showSeconds prop, overall behavior seems strange investigate!
