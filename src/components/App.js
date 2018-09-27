import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faDownload, faPen, faPlus, faMinus, faTrashAlt, faEllipsisH, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faCheck, faDownload, faPen, faPlus, faMinus, faTrashAlt, faEllipsisH, faAngleDown, faAngleUp);

import LoginComponent from './login/LoginComponent/LoginComponent';

import * as others from '../functions/others/others-functions';

import '../css/app.scss';

class App extends Component {

	constructor(){
		super();
		this.state = {
			redirect: false
		}
	}

	componentDidMount(){

		if (others.getCookie('jwt') === undefined)
				this.setState({ redirect: true });
			else 
				if (this.state.redirect !== false)
					this.setState({ redirect: false })

		/*window.addEventListener('focus', () => {
			if (others.getCookie('jwt') === undefined)
				this.setState({ redirect: true });
			else 
				if (this.state.redirect !== false)
					this.setState({ redirect: false })
		})*/
	}

	quit = () => {
		others.deleteCookie('jwt');
		location.reload();
		this.setState({ redirect: true });
	}

	render(){
		return (
			<div className="component component__app">
				<div className="component__app menu">
					<div onClick={this.quit}>Exit</div>
					<Link to="/dictionary">
						<div className="menu__button"></div>
					</Link>
				</div>
				
				{this.state.redirect ?
					<Redirect to="/login" />
				: null }
			</div>
		)
	}
}

export default App;