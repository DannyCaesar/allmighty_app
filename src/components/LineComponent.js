import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../css/dict_line.scss';

class LineComponent extends Component {
	
	remove = () => {
		const english = document.getElementById(`${this.props.id}english`).innerHTML;
		const german = document.getElementById(this.props.id+"german").innerHTML;
		const russian = document.getElementById(this.props.id+"russian").innerHTML;

		const data = {
			english: english,
			german: german,
			russian: russian
		}

		axios.patch('/api/words',data)
		.catch(error => console.log(error));
		
		this.props.onRemoveNote(data);
	}

	render(){
		return (
			<div className="component component__lineComponent">
				<div className="component__lineComponent line">
					<div className="col-xs-3 col-md-3 line__block" id={`${this.props.id}english`}>{this.props.english}</div>
					<div className="col-xs-3 col-md-3 line__block" id={this.props.id+"german"}>{this.props.german}</div>
					<div className="col-xs-3 col-md-3 line__block" id={this.props.id+"russian"}>{this.props.russian}</div>
					<div className="col-xs-1" onClick={this.remove}>Delete</div>
					<div className="col-xs-1">Edit</div>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onRemoveNote: (note) => {
			dispatch({ type: "REMOVE_NOTE", payload: note });
		}
	})
)(LineComponent);