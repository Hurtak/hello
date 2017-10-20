import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'
import * as stylesGlobal from '../styles/styles-shared.js'

class Age extends React.Component {
  static propTypes = {
    birthDate: propTypes.number.isRequired,
    decimalPlaces: propTypes.number.isRequired
  }

  render () {
    const year = 365 * 24 * 60 * 60 * 1000

    const tsNow = new Date().getTime()
    const years = (tsNow - this.props.birthDate) / year

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
  marginTop: stylesGlobal.grid(1),
  padding: stylesGlobal.grid(2),
  backgroundColor: stylesGlobal.colors.whiteTransparentDefault,
  color: stylesGlobal.colors.white
})

const AgeText = glamorous.div({
  ...stylesGlobal.fonts.medium,
  textAlign: 'center'
})

export default Age
