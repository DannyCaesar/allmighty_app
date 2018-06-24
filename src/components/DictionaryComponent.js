import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DictionaryComponent extends Component {
	render(){
		return (
			<div>
				<Link to="/">To home</Link>
			</div>
		)
	}
} 

export default DictionaryComponent;