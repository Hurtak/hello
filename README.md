# Hello

- https://hello-extension.netlify.com

## Development

- install `npm ci`
- run in development mode `npm run start`
- run tests, type check and prettier check `npm run validate`
- build `npm run build`

## Release

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

## TODOS

- chrome store
  - images without settings button
  - better description?
  - better logo?
- cors proxy
  - on now
  - on heroku?
- changelog
- fonts
  - precise cap-height boundaries for fonts
  - add line-heights so there is proper spacing between fonts
- hotkeys (esc) do not work when input is focused
  - https://github.com/JohannesKlauss/react-hotkeys-hook/issues/127
- write article
- release on twitter
- release on reddit
- release on HN
- when settings has focus, show it on minimalistic view
- problem, sometimes i want to view the calendar
  - keyboard shortcuts? so we can easily show toggle/switch to calendar/time whatever?
- fade in animation of main view and settings button
- introduce changelog
  - menu changelog link
- show location and links somewhere else and somewhere more visible accesible?
  - main reasoning: you will use the settings once at the beginning, then you will only look what is on the picture etc
- decimal places in age configurable
- support for firefox?
- animations
  - use react-spring
  - animate view transitions
  - animate menu height
  - also menu bugs
    - no when menu height content is extended, it lags behind content
    - when menu height content is collapsed, it happens instantly
  - animate text appear/disapper in menu
- when we cross viewport min width there is vertical scrollbar??
- hotkeys to toggle calendar/time
- background image switching animation
- revisit tsconfig
- docs
- images
  - bing image of the day
    - download once a hour?
    - what happense when we have outdated data?
    - display new image on subsequent page visits?
  - error handling
    - show error when image cannot be loaded
    - backup background when image cannot be loaded
    - when no internet auto fallback to offline images?
    - when no internet disable menu settings and show error message
- background image transition does not work for local images
- responsive menu
- change fonts
- tweet about this!
- global("body", { backgroundColor: colors.grayChrome, }
  - problem this is inserted at runtime so we wee white screen splash from default styles?
  - or maybe even if we had css file we would seee this splash?
- fill github descriptions and stuff
- user-select: none na vsechno?
- support
  - firefox plugin
  - web app - github pages hosted
- when loading new image, add blur our, blur in efect
- settings
  - bouncy transitions on settings box and cog
  - close button
    - transformation to close button?
    - hover styles
    - focus styles
- fix tests
- resolve all todos in code
- when menu is closed, disable all form field, or do not render the html
- conditional updated is broken when we change clocks showSeconds prop, overall behavior seems strange investigate!
- finish design for calendar
  - responsive design
- finish design for year progress
  - maybe get rid of this guy?
  - responsive design
