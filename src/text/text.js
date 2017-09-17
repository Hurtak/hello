import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './text.css'

class Text extends React.Component {
  static propTypes = {
    size: propTypes.oneOf(['heading', 'medium', 'small']).isRequired,
    inline: propTypes.bool,
    align: propTypes.oneOf(['left', 'center', 'right']),
    bold: propTypes.bool,
    color: propTypes.oneOf(['gray'])
  }

  render () {
    const size = this.props.size || 'medium'

    return (
      <span
        className={classnames(
          'Text',
          {
            'Text--sizeSmall': size === 'small',
            'Text--sizeMedium': size === 'medium',

            'Text--colorGray': this.props.color === 'gray',

            'Text--alignLeft': this.props.align === 'left',
            'Text--alignCenter': this.props.align === 'center',
            'Text--alignRight': this.props.align === 'right',

            'Text--displayInline': this.props.inline === true,

            'Text--weightBold': this.props.bold === true
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
