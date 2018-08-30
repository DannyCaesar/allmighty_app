import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './logo-styles.scss';

class Logo extends Component {
	render(){
		return (
			<div className="logo__container">
				<Link to={this.props.link}>
					<div className="logo">
					</div>
				</Link>
			</div>
		)
	}
}

export default Logo;

Logo.propTypes = {
	link: PropTypes.string
}