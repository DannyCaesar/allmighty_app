import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './components/RouterComponent';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';


import reducer from './redux/reducers';
import rootSaga from './redux/sagas'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(
    sagaMiddleware
  ))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<RouterComponent />
		</BrowserRouter>
	</Provider>,
document.getElementById('root'));
