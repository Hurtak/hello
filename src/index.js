import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app.js'
import * as globalGlobal from './styles/styles-global.js'

globalGlobal.init()
ReactDOM.render(<App />, document.getElementById('root'))
