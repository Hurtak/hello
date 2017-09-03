import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './text.css'

class Text extends React.Component {
  // TODO: revmap what sizes/colors/tags are used
  static propTypes = {
    inline: propTypes.bool,
    size: propTypes.oneOf(['heading', 'medium', 'small']).isRequired,
    color: propTypes.oneOf(['gray'])
  }

  render () {
    const Tag = this.props.inline ? 'span' : 'p'
    const size = this.props.size || 'medium'
    const color = this.props.color

    return (
      <Tag
        className={classnames(
          'Text',
          {
            [`Text--${size}`]: Boolean(size),
            [`Text--${color}`]: Boolean(color)
          },
          this.props.className
        )}
      >
        {this.props.children}
      </Tag>
    )
  }
}

export default Text
