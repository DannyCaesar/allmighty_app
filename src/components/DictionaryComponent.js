import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import LineComponent from './LineComponent';
import '../css/dict.scss';

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
		this.setState({ showAdd: !this.state.showAdd })
	}

	closeAddWindow = () => {
		this.setState({ showAdd: false })
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
			<div className="component">
				<Link to="/"><div className="component__logo"></div></Link>
				<div className="btn__dict_container">
					<div className="btn btn__dict btn__dict_add" onClick={this.showAddWindow}><i className="fas fa-plus"></i></div>
					<div className="btn btn__dict btn__dict_settings" onClick={this.showAddWindow}><i className="fas fa-ellipsis-h"></i></div>
				</div>

				{this.state.showAdd ? 
				<div className="add-note-window col-xs-10 col-xs-offset-1">
					<div className="add-note-window__header">Добавить запись <i className="fas fa-times" onClick={this.closeAddWindow}></i></div>
					<div className="add-note-window__body">
						<div className="col-xs-4 add-note-window__block">
							<input type="text" placeholder="English word" id="english" />
						</div>
						<div className="col-xs-4 add-note-window__block">
							<input type="text" placeholder="Deutsches Wort" id="german" />
						</div>
						<div className="col-xs-4 add-note-window__block">
							<input type="text" placeholder="Русское слово" id="russian" />
						</div>
						<div className="add-note-window__btn">
							<div className="btn btn__dict btn__dict_check" onClick={this.addNote}><i className="fas fa-check"></i></div>
						</div>
					</div>
				</div>
				: null }

				<div className="line-container col-xs-10 col-xs-offset-1">
					<div className="col-xs-12">
						<div className="line__header col-xs-12">
							<div className="col-xs-4 line__header_right">English</div>
							<div className="col-xs-4">Deutsch</div>
							<div className="col-xs-4 line__header_left">Русский</div>
						</div>
					</div>
				</div>
				
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