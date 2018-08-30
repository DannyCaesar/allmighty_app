import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/app.scss';

class App extends Component {

	render(){
		return (
			<div className="component component__app">
				<div className="component__app menu">
					<Link to="/dictionary">
						<div className="menu__button"></div>
					</Link>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	})
)(App);