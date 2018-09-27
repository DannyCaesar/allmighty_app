import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './RegistrationComponent.scss';

class RegistrationComponent extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			surname: '',
			username: '',
			password: '',
			confirm_password: '',
			message: '',
			redirect: false
		}
	}

	shouldComponentUpdate(nextState){
		return (this.state.message !== nextState.message);
	}

	setName = (e) => { this.setState({ name: e.target.value }); }
	setSurname = (e) => { this.setState({ surname: e.target.value }); }
	setUsername = (e) => { this.setState({ username: e.target.value }); }
	setPassword = (e) => { this.setState({ password: e.target.value }); }
	setConfirmPassword = (e) => { this.setState({ confirm_password: e.target.value }) }    

	closeMessage = () => {
		this.setState({ message: '' });
	}

	frontValidation = () => {
		let error = false;

		if (this.state.name.length === 0) { this.setState({ message: "Name field is empty" }); error = true; }
		else if (this.state.surname.length === 0) { this.setState({ message: "Surname field is empty" }); error = true; }
		else if (this.state.username.length === 0) { this.setState({ message: "Username field is empty" }); error = true; }
		else if (this.state.password.length === 0) { this.setState({ message: "Password field is empty" }); error = true; }
		else if (this.state.password !== this.state.confirm_password) {
			this.setState({ message: "Passwords do not match!" });
			error = true;
		}

		if (!error) {

			const data = {
				name: this.state.name,
				surname: this.state.surname,
				username: this.state.username,
				password: this.state.password
			}

			axios.post('/auth/registration', {
				data: data
			});

			this.setState({ redirect: true });
		}
	}

	render(){
		return (
			<div className="registration-component">
				
				<div className="registration-component__logo_wrapper">
					<div className="registration-component__logo"></div>
					<div className="registration-component__logo-char"></div>
				</div>

				<div className="registration-component__form col-xs-10 col-sm-6">

					<div className="registration-component__form-block">
						<span className="registration-component__icon"><i className="fas fa-user"></i></span>
						<input className="registration-component__input" type="text" placeholder="Name" defaultValue={this.state.name} onChange={this.setName} />
					</div>

					<div className="registration-component__form-block">
						<span className="registration-component__icon"><i className="fas fa-user"></i></span>
						<input className="registration-component__input" type="text" placeholder="Surname" defaultValue={this.state.surname} onChange={this.setSurname} />
					</div>

					<div className="registration-component__form-block">
						<span className="registration-component__icon"><i className="fas fa-user"></i></span>
						<input className="registration-component__input" type="text" placeholder="Username" required defaultValue={this.state.username} onChange={this.setUsername} />
					</div>

					<div className="registration-component__form-block">
					<span className="registration-component__icon"><i className="fas fa-lock"></i></span>
						<input className="registration-component__input" type="password" placeholder="Password" required defaultValue={this.state.password} onChange={this.setPassword} />
					</div>

					<div className="registration-component__form-block">
						<span className="registration-component__icon"><i className="fas fa-lock"></i></span>
						<input className="registration-component__input" type="password" placeholder="Confirm password" required defaultValue={this.state.confirm_password} onChange={this.setConfirmPassword} />
					</div>

					<div className="registration-component__button" onClick={this.frontValidation}><i className="fas fa-angle-right"></i></div>
					<div className="registration-component__form-footer">
						<span>Already have an account? <Link to="/login"><span>Sign in</span></Link></span>
					</div>

					{this.state.message.length !== 0 ? 
					<div className="registration-component__message-container">
						<div className="registration-component__message">
							{this.state.message}
						</div>
						<div className="registration-component__message_close"><i className="fas fa-times" onClick={this.closeMessage}></i></div>
					</div>
					: null }

					{this.state.redirect ?
						<Redirect to="/login" />
					: null }
				</div>
			</div>
		)
	}
}

export default RegistrationComponent;