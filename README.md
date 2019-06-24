# Hello Friend

## TODO

- settings design
  - settings texts
  - settings structure
  - settings styles
  - show offline indicator?
  - disable bing when offline
  - show proper error messages when bing image / proxy error
  - when settings button has focus, remove 100% opacity
  - settings responsive
- menu overflowing -> add scroll
- remove unused fonts
- add more images!
- reneme to hello
- go through manifest.json
  - unnecessary permissins?
  - missing fields?
  - update existing fields
- release

## Later TODOS

- when we cross viewport min width there is vertical scrollbar??
- Deps
  - Broken
    - @types/styled-components 4.1.8 ❯ 4.1.16
      - typings completely broken
  - Broken
    - typescript 3.4.5 ❯ 3.5.2
      - WARNING: You are currently running a version of TypeScript which is not officially supported by typescript-estree
      - SUPPORTED TYPESCRIPT VERSIONS: >=3.2.1 <3.5.0
  - @types/css-font-loading-module
    - once window.FontFace becomes standardised, remove
  - resize-observer-polyfill
    - remove, once supported
  - wicg-inert
    - remove, once supported
- hotkeys to toggle calendar/time
- background image switching animation
- check STRV checklist
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
- decimal places in age
- properly fill package.json
  - repository
  - bump version to 1.0
  - license
  - author
- fill github descriptions and stuff
- user-select: none na vsechno?
- support
  - chrome plugin
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

## Future improvements

- once `ResizeObserver` has good browser support, remove polyfill
- once `inert` has good browser support, remove polyfill and typings
- once backdrop-filter is supported, start using it instead of transparent background color
