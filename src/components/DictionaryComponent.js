import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class DictionaryComponent extends Component {
	
	addNote = () => {
		console.log('das');
	}

	render(){
		return (
			<div>
				<Link to="/">To home</Link>
				<div className="dictBtn dictBtn_add" onClick={this.addNote}>+</div>
				
			</div>
		)
	}
} 

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onAddNote: (note) => {
			dispatch({ type: 'ADD_NOTE', payload: note })
		}
	})
)(DictionaryComponent);