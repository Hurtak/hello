import React from 'react'
import ReactDOM from 'react-dom'
import * as fela from 'fela'
import * as reactFela from 'react-fela'
import App from './app.js'

const { it } = global

it('renders without crashing', () => {
  const renderer = fela.createRenderer()

  ReactDOM.render(
    <reactFela.Provider renderer={renderer}>
      <App />
    </reactFela.Provider>,
    document.createElement('div')
  )
})
