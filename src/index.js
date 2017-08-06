import React from 'react';
import ReactDOM from 'react-dom';
import * as fela from 'fela';
import * as reactFela from 'react-fela';

import './index.css';
import App from './components/app.js';
import registerServiceWorker from './registerServiceWorker.js';

const renderer = fela.createRenderer();

ReactDOM.render(
	<reactFela.Provider renderer={renderer}>
		<App />
	</reactFela.Provider>,
	document.getElementById('root')
);
registerServiceWorker();
