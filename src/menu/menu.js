import React from 'react'
import propTypes from 'prop-types'
import './menu.css'

class Menu extends React.Component {
  static propTypes = {
    urlsOfImages: propTypes.arrayOf(propTypes.string.isRequired).isRequired
  }

  render () {
    return (
      <section className='Menu'>
        <h1>Calendar</h1>
        <p>Something about this app</p>

        <textarea
          className='Menu-textarea'
          defaultValue={this.props.urlsOfImages.join('\n')}
        />
      </section>
    )
  }
}

export default Menu
