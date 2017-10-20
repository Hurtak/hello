const grid = size => `${size * 8}px`

const colors = {
  white: 'white',
  grayMain: 'gray',
  grayChrome: '#f2f1f0',
  whiteTransparentDimmed: 'rgba(0, 0, 0, 0.2)',
  whiteTransparentDefault: 'rgba(0, 0, 0, 0.4)',
  whiteTransparentBright: 'rgba(0, 0, 0, 0.8)'
}

const fontShared = {
  margin: 0,
  padding: 0,
  color: 'white',
  fontFamily: 'Monospace',
  lineHeight: 1
}

const fonts = {
  medium: {
    ...fontShared,
    fontSize: '14px'
  }
}

export { grid, colors, fonts }
