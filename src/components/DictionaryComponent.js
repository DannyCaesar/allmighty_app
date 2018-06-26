import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import LineComponent from './LineComponent';


class DictionaryComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			showAdd: false
		}
	}

	componentDidMount(){
		axios.get('/api/words')
		.then(response => {
			const dataFetched = response.data;
			dataFetched.forEach((item) => {
				this.props.onAddNote(item)
			})
		})
		.catch(error => {
			console.log(error);
		})
	}

	showAddWindow = () => {
		this.setState({showAdd: !this.state.showAdd })
	}

	addNote = () => {
		const german = document.getElementById('german').value;
		const english = document.getElementById('english').value;
		const russian = document.getElementById('russian').value;

		const data = {
			english: english,
			german: german,
			russian: russian
		}

		axios.post('/api/words', data)
		.catch(error => console.log(error))
		this.props.onAddNote(data);
	}

	render(){
		return (
			<div>
				<Link to="/">To home</Link>
				<div className="dictBtn dictBtn_add" onClick={this.showAddWindow}>+</div>
				{this.state.showAdd ? 
				<div>
					<div>
						<input type="text" placeholder="English word" id="english" />
					</div>
					<div>
						<input type="text" placeholder="Deutsches Wort" id="german" />
					</div>
					<div>
						<input type="text" placeholder="Русское слово" id="russian" />
					</div>
					<div className="dictBtn dictBtn_add" onClick={this.addNote}>+</div>
				</div>
				: null }
				<div className="container container__dict">
					{ this.props.store.dictionary_notes.map((note, index) => 
						<LineComponent 
							key={`line${index}`}
							id={`line${index}`}
							db_id={note._id}
							english={note.english}
							german={note.german}
							russian={note.russian}
						/>
					)}
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
		onAddNote: (note) => {
			dispatch({ type: 'ADD_NOTE', payload: note })
		}
	})
)(DictionaryComponent);