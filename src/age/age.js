import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'
import * as styles from '../styles/styles.js'

class Age extends React.Component {
  static propTypes = {
    decimalPlaces: propTypes.number.isRequired
  }

  render () {
    const year = 365 * 24 * 60 * 60 * 1000

    const tsNow = new Date().getTime()
    const tsBirthDate = new Date(1991, 3, 20).getTime()

    const years = (tsNow - tsBirthDate) / year

    return (
      <AgeWrapper>
        <AgeText>
          {years.toFixed(this.props.decimalPlaces)}
        </AgeText>
      </AgeWrapper>
    )
  }
}

const AgeWrapper = glamorous.div({
  marginTop: styles.grid(1),
  padding: styles.grid(2),
  backgroundColor: styles.colors.whiteTransparentDefault,
  color: styles.colors.white
})

const AgeText = glamorous.div({
  ...styles.fonts.medium,
  textAlign: 'center'
})

export default Age
