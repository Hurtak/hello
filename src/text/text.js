import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './text.css'

// TODO: revmap what sizes/colors/tags are used
class Text extends React.Component {
  static propTypes = {
    tag: propTypes.oneOf(['h2', 'p', 'span']),
    size: propTypes.oneOf(['heading', 'medium', 'small']).isRequired,
    color: propTypes.oneOf(['gray'])
  }

  render () {
    const Tag = this.props.tag || 'span'
    const size = this.props.size || 'medium'

    return (
      <Tag
        className={classnames('Text', {
          [`Text--${size}`]: Boolean(size),
          'Text--gray': this.props.color === 'gray'
        })}
      >
        {this.props.children}
      </Tag>
    )
  }
}

export default Text
