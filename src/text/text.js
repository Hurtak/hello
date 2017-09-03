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
    const size = this.props.size || 'medium'

    return (
      <span
        className={classnames(
          'Text',
          `Text--${size}`,
          {
            [`Text--${this.props.color}`]: Boolean(this.props.color),
            'Text--inline': Boolean(this.props.inline)
          },
          this.props.className
        )}
      >
        {this.props.children}
      </span>
    )
  }
}

export default Text
