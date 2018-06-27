import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import App from './App';
import DictionaryComponent from './DictionaryComponent';

class RouterComponent extends Component {
	render(){
		return(
			<div> 
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/dictionary" component={DictionaryComponent} />
					<Route path="/home" component={App} />
				</Switch>
			</div>
		)
	}
}

export default RouterComponent;