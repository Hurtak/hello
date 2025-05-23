# Hello

- Chrome & Firefox extension that replaces new tab page with widgets and fresh image every day.
- Live example: https://hello-extension.netlify.app
- Chrome store link: https://chrome.google.com/webstore/detail/hello/olenfgbgcphkaipfeohfjpagibimmpke
- Firefox store link: https://addons.mozilla.org/en-US/firefox/addon/hello-new-tab/

## Development

- install `npm ci`
- run in development mode `npm run start`
- run tests, type check and prettier check `npm run validate`
- build `npm run build`

## Release

- check if `CHANGELOG.md` is properly filled and date is updated
- up versions in `CHANGELOG.md`, `package.json` and `manifest.json`
- run `npm i` to propagate the version into `package-lock.json`
- make commit with message `prepare VERSION_NUMBER`
- run `node ./scripts/release.js`
- go to https://github.com/Hurtak/hello/actions/ and download the release tag build artifacts `hello-src.zip` and `hello-build.zip`
- Chrome
  - go to https://chrome.google.com/webstore/devconsole
  - upload new version `hello-build.zip`
- Firefox
  - go to https://addons.mozilla.org/en-US/developers/addon/hello-new-tab/versions/submit/
  - and upload new version `hello-build.zip`
  - `Do You Need to Submit Source Code` answer yes and upload `hello-src.zip`

## Random notes

- Chrome CSP
  - Because of Chrome plugins CSP policy we cannot have inline scripts unless we mention their sha256+base64 value in `manifest.json` in `content_security_policy` field. Create React App includes some inline scripts by default so we would either need to have some build pipeline that extracts these scripts value and ads its sha256+base64 into manifest.json or we could use `INLINE_RUNTIME_CHUNK=false` environment variable that puts these scripts into external file.
- Create React App does not support testing files that have name `test.ts`, only files with `*.test.ts` or `*.spec.ts` patterns, so we go around this by calling tests `spec.test.ts`
- Global state is available in dev mode on `window._state`.
- Bing API does not provide CORS headers, so we have `./hello-cors-proxy` project that proxies the requests.s

## Dependencies

- `wicg-inert`
  - remove polyfill, once supported by browsers

## Attributions

- Icon by [Alice Noir](https://thenounproject.com/AliceNoir/uploads/?i=576432) with slight modifications by me.

## TODOs

- chrome store
  - images without settings button
- hotkeys (esc) do not work when input is focused
  - https://github.com/JohannesKlauss/react-hotkeys-hook/issues/127
- show changelog somewhere in menu
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
- conditional updated is broken when we change clocks showSeconds prop, overall behavior seems strange investigate!
- add calendar widget?
- add another image providers?
  - https://chrome.google.com/webstore/detail/telescope/mcbkdemjpfgkelnhcnbkoafaljnblcjd
  - https://chrome.google.com/webstore/detail/new-tab-art/oldcmmikbakmkmikgikndeekekdihgnf
  - https://github.com/Hurtak/hello/issues/1
- images
  - try to load image from cache, if it is there display it, if not only then display offline fallback
  - bing image of the day
    - download once a hour, not on every page view?
    - when downloaded and it is new one, should we immediately switch to new one, or on next page view?
