import React from 'react'
import propTypes from 'prop-types'
import Text from '../text/text.js'
import './age.css'

export default class Age extends React.Component {
  static propTypes = {
    decimalPlaces: propTypes.number.isRequired
  }

  render () {
    const year = 365 * 24 * 60 * 60 * 1000

    const tsNow = new Date().getTime()
    const tsBirthDate = new Date(1991, 3, 20).getTime()

    const years = (tsNow - tsBirthDate) / year

    return (
      <div className='Age'>
        <div
          className='Age-bar'
          style={{
            width: 100 + '%'
          }}
        />
        <div className='Age-textWrapper'>
          <Text size='medium'>
            {years.toFixed(this.props.decimalPlaces)}
            %
          </Text>
        </div>
      </div>
    )
  }
}
