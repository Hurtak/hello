import 'raf/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'

const { it } = global

it('renders without crashing', () => {
  ReactDOM.render(<App />, document.createElement('div'))
})
