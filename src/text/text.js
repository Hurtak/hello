import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './text.css'

class Text extends React.Component {
  static propTypes = {
    tag: propTypes.string,
    size: propTypes.oneOf(['medium', 'small']).isRequired,
    block: propTypes.bool,
    align: propTypes.oneOf(['left', 'center', 'right']),
    bold: propTypes.bool,
    color: propTypes.oneOf(['gray'])
  }

  render () {
    const {
      tag: Tag = this.props.block ? 'div' : 'span',
      size = 'medium',
      color,
      align,
      block,
      bold,
      className,
      ...restProps
    } = this.props

    return (
      <Tag
        className={classnames(
          'Text',
          {
            'Text--sizeSmall': size === 'small',
            'Text--sizeMedium': size === 'medium',

            'Text--colorGray': color === 'gray',

            'Text--alignLeft': align === 'left',
            'Text--alignCenter': align === 'center',
            'Text--alignRight': align === 'right',

            'Text--displayBlock': block === true,

            'Text--weightBold': bold === true
          },
          className
        )}
        {...restProps}
      >
        {this.props.children}
      </Tag>
    )
  }
}

export default Text
