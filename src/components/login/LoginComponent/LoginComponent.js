import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
	render(){
		return (
			<div>
				<form method="POST">
					<input type="text" placeholder="Login" />
					<input type="text" placeholder="Password" />
					<button type="submit">Enter</button>
				</form>
				<div>
					<span>Do not have account yet? <Link to="/registration">Register</Link></span>
				</div>
			</div>
		)
	}
}

export default LoginComponent;