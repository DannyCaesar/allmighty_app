import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './components/RouterComponent';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<RouterComponent />
	</BrowserRouter>,
document.getElementById('root'));
