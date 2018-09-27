import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './LoginComponent.scss';

class LoginComponent extends Component {
	constructor(){
		super();
		this.state = {
			login: '',
			password: '',
			message: '',
			redirect: false
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return (this.state.message !== nextState.message || this.state.redirect !== nextState.redirect);
	}

	setLogin = (e) => { this.setState({ login: e.target.value }); };
	setPassword = (e) => { this.setState({ password: e.target.value }); };

	proceed = (e) => {
		if (e.key === "Enter")
			this.sendData();
	}

	sendData = () => {

		if (this.state.login.length === 0) this.setState({ message: "Login is empty" });
		else if (this.state.password.length === 0) this.setState({ message: "Password is empty" });
		else {
			axios.post('/auth/login', {
				login: this.state.login,
				password: this.state.password
			})
			.then((response) => {
				this.setState({ message: response.data.message });
				if (response.data.message === "OK")
					this.setState({ redirect: true });
			})
			.catch(error => console.log(error));
		}
	}

	closeMessage = () => {
		this.setState({ message: '' });
	}

	render(){
		return (
			<div className="login-component">
				<div className="login-component__logo_wrapper">
					<div className="login-component__logo"></div>
					<div className="login-component__logo-char"></div>
				</div>

				<div className="login-component__form col-xs-10 col-sm-6">

					<div className="login-component__form-block">
						<span className="login-component__icon"><i className="fas fa-user"></i></span>
						<input className="login-component__input" type="text" placeholder="Login" required defaultValue={this.state.login} onChange={this.setLogin} onKeyPress={this.proceed} />
					</div>

					<div className="login-component__form-block">
						<span className="login-component__icon"><i className="fas fa-unlock"></i></span>
						<input className="login-component__input" type="password" placeholder="Password" required defaultValue={this.state.password} onChange={this.setPassword} onKeyPress={this.proceed} />
					</div>

					<div className="login-component__button" onClick={this.sendData}><i className="fas fa-angle-right"></i></div>
					<div className="login-component__form-footer">
						<span>Do not have an account yet? <Link to="/registration"><span>Register</span></Link></span>
					</div>

					{this.state.message.length > 0 ? 
					<div className="login-component__message-container">
						<div className="login-component__message">
							{this.state.message}
						</div>
						<div className="login-component__message_close"><i className="fas fa-times" onClick={this.closeMessage}></i></div>
					</div>
					: null }

				</div>
				{this.state.redirect ? 
					<Redirect to="/" />
				: null }
			</div>
		)
	}
}

export default LoginComponent;