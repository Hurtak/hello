import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './components/app.js'
import registerServiceWorker from './registerServiceWorker.js'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
