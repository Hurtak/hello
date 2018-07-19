# Hello Friend

## TODO

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

---

- menu design
  - responsive
- change fonts
- glamor.css.global("body", { backgroundColor: colors.grayChrome, }
  - problem this is inserted at runtime so we wee white screen splash from default styles?
  - or maybe even if we had css file we would seee this splash?
- decimal places in age
- go through manifest.json
  - unnecessary permissins?
  - missing fields?
  - update existing fields
- properly fill package.json
  - repository
  - bump version to 1.0
  - license
  - author
- fill github descriptions and stuff
- support
  - chrome plugin
  - firefox plugin
  - web app - github pages hosted
- user-select: none na vsechno?

## Later TODOS

- when loading new image, add blur our, blur in efect
- settings
  - bouncy transitions on settings box and cog
  - close button
    - transformation to close button?
    - hover styles
    - focus styles
- fix tests
- remove Lato font if it is not used anywhere
- resolve all todos in code
- when menu is closed, disable all form field, or do not render the html
- conditional updated is broken when we change clocks showSeconds prop, overall behavior seems strange investigate!
- finish design for calendar
  - responsive design
- finish design for year progress
  - maybe get rid of this guy?
  - responsive design
- fade in animation - like that chrome plugin

## Future improvements

- Once ResizeObserver has good browser support, remove polyfill
- once backdrop-filter is supported, start using it instead of transparent background color
