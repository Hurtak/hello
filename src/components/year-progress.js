import React from 'react'
import './year-progress.css'

export default class YearProgress extends React.Component {
  render () {
    const progress = getYearProgress(this.props.time)

    return (
      <div className='YearProgress'>
        <div
          className='YearProgress-bar'
          style={{
            width: progress * 100 + '%'
          }}
        />
        <p className='YearProgress-text'>
          {Math.floor(progress * 100)}%
        </p>
      </div>
    )
  }
}

export function getYearProgress (timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()

  const dateStart = new Date(year, 0, 1, 0, 0, 0, 0).getTime()
  console.log(new Date(dateStart))
  const dateEnd = new Date(year, 11, 31, 23, 59, 59, 999).getTime()
  console.log(new Date(dateEnd))

  return Math.floor((timestamp - dateStart) / (dateEnd - dateStart))
}
