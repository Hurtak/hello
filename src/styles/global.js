import * as glamor from 'glamor'
import * as styles from './styles.js'

function init () {
  // Resets
  glamor.css.global('body', {
    margin: 0
  })

  // General styles
  glamor.css.global('body', {
    backgroundColor: styles.colors.grayChrome,
    // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
    position: 'relative'
  })
}

export { init }
