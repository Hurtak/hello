import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'
import * as styles from '../styles/styles.js'

export default class YearProgress extends React.Component {
  static propTypes = {
    decimalPlaces: propTypes.number.isRequired
  }

  render () {
    const progress = getYearProgress(this.props.time)

    return (
      <YearProgressWrapper>
        <YearProgressBar style={{ width: progress * 100 + '%' }} />
        <YearProgressText>
          {(progress * 100).toFixed(this.props.decimalPlaces)}%
        </YearProgressText>
      </YearProgressWrapper>
    )
  }
}

const YearProgressWrapper = glamorous.div({
  position: 'relative',
  width: '100%',
  height: styles.grid(8),
  padding: styles.grid(0.25),
  marginTop: styles.grid(1),
  border: `${styles.grid(0.25)} solid ${styles.colors.whiteTransparentDefault}`
})

const YearProgressBar = glamorous.div({
  height: '100%',
  backgroundColor: styles.colors.whiteTransparentDefault
})

const YearProgressText = glamorous.div({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  ...styles.fonts.medium
})

export function getYearProgress (timestamp) {
  const now = new Date(timestamp)
  const year = now.getFullYear()
  const tsNow = now.getTime()
  const tsYearStart = new Date(year, 0, 1, 0, 0, 0, 0).getTime()
  const tsYearEnd = new Date(year + 1, 0).getTime() - 1000

  return (tsNow - tsYearStart) / (tsYearEnd - tsYearStart)
}
