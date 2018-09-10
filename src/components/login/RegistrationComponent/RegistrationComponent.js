import React, { Component } from 'react';
import axios from 'axios';

class RegistrationComponent extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			surname: '',
			username: '',
			password: '',
			confirm_password: '',
			message: ''
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

	frontValidation = (e) => {
		e.preventDefault();
		let error = false;
		if (this.state.password !== this.state.confirm_password) {
			this.setState({ message: "Passwords do not match!" });
		}

		if (!error) {

			const data = {
				name: this.state.name,
				surname: this.state.surname,
				username: this.state.username,
				password: this.state.password
			}

			axios.post('/api/registration', {
				data: data
			});
		}
	}

	render(){
		return (
			<div>
				RegistrationComponent
				{this.state.message.length !== 0 ? 
					<div>{this.state.message}</div>
				: null }
				<form method="POST" action="/registration">
					<input type="text" placeholder="Name" defaultValue={this.state.name} onChange={this.setName} />
					<input type="text" placeholder="Surname" defaultValue={this.state.surname} onChange={this.setSurname} />
					<input type="text" placeholder="Username" required defaultValue={this.state.username} onChange={this.setUsername} />
					<input type="text" placeholder="Password" required defaultValue={this.state.password} onChange={this.setPassword} />
					<input type="text" placeholder="Confirm password" required defaultValue={this.state.confirm_password} onChange={this.setConfirmPassword} />
					<button onClick={this.frontValidation}>Register</button>
				</form>
			</div>
		)
	}
}

export default RegistrationComponent;