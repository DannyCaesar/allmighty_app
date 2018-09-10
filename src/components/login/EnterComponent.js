import React, { Component } from 'react';
import LoginComponent from './LoginComponent/LoginComponent';
import RegistrationComponent from './RegistrationComponent/RegistrationComponent';

class EnterComponent extends Component {
	render(){
		return (
			<div>
				<LoginComponent />
			</div>
		)
	}
}

export default EnterComponent;