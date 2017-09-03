import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './text.css'

class Text extends React.Component {
  // TODO: revmap what sizes/colors/tags are used
  static propTypes = {
    tag: propTypes.oneOf(['h2', 'p', 'span']),
    size: propTypes.oneOf(['heading', 'medium', 'small']).isRequired,
    color: propTypes.oneOf(['gray'])
  }

  render () {
    const Tag = this.props.tag || 'span'
    const size = this.props.size || 'medium'
    const color = this.props.color

    return (
      <Tag
        className={classnames('Text', {
          [`Text--${size}`]: Boolean(size),
          [`Text--${color}`]: Boolean(color)
        })}
      >
        {this.props.children}
      </Tag>
    )
  }
}

export default Text
