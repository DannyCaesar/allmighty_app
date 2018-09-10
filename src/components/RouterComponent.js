import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import App from './App';
import DictionaryComponent from './dictionary/DictionaryComponent/DictionaryComponent';
import RegistrationComponent from './login/RegistrationComponent/RegistrationComponent';
import LoginComponent from './login/LoginComponent/LoginComponent';

class RouterComponent extends Component {
	render(){
		return(
			<div> 
				<Switch>
					<Route exact path="/" component={LoginComponent} />
					<Route path="/dictionary" component={DictionaryComponent} />
					<Route exact path="/home" component={App} />
					<Route exact path="/login" component={LoginComponent} />
					<Route exact path="/registration" component={RegistrationComponent} />
				</Switch>
			</div>
		)
	}
}

export default RouterComponent;