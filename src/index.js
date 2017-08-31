import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app.js'
import registerServiceWorker from './registerServiceWorker.js'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
