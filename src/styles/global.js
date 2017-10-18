import * as glamor from 'glamor'
import * as styles from './styles.js'

function init () {
  // Resets
  glamor.css.global('body', {
    margin: 0
  })

  /*
   * better box-sizing: border-box reset
   * @see: https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
   */
  glamor.css.global('html', {
    boxSizing: 'border-box'
  })

  glamor.css.global('*, *:before, *:after', {
    boxSizing: 'inherit'
  })

  // General styles
  glamor.css.global('body', {
    backgroundColor: styles.colors.grayChrome,

    // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
    position: 'relative'
  })
}

export { init }
