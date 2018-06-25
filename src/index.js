import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './components/RouterComponent';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import reducer from './reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<RouterComponent />
		</BrowserRouter>
	</Provider>,
document.getElementById('root'));
