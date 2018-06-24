import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/global.scss';

class App extends Component {
	render(){
		return (
			<div>
				<div><Link to="/dictionary">Dictionary Button</Link></div>
			</div>
		)
	}
}

export default App;