import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import LineComponent from './LineComponent';
import SettingsComponent from './SettingsComponent';
import '../../css/dict.scss';

class DictionaryComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			showAdd: true,
			showSettings: false,
			selectedGroup: ''
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

		axios.get('/api/groups')
		.then(response => {
			const dataFetched = response.data;
			dataFetched.forEach((item) => {
				this.props.onAddGroup(item)
			})
		})
		.catch(error => console.log(error))

	}


	showAddWindow = () => {
		this.setState({ showAdd: !this.state.showAdd })
	}

	showSettingsWindow = () => {
		this.setState({ showSettings: !this.state.showSettings })
	}

	closeAddWindow = () => {
		this.setState({ showAdd: false })
	}

	closeSettingsWindow = (value) => {
		this.setState({ showSettings: value })
	}

	addNote = () => {
		const german = document.getElementById('german').value;
		const english = document.getElementById('english').value;
		const russian = document.getElementById('russian').value;
		let groups = [];

		if (this.state.selectedGroup !== '')
			groups = [this.state.selectedGroup._id];

		const data = {
			english: english,
			german: german,
			russian: russian,
			dateAdd: new Date(),
			important: false,
			forms: [],
			groups: groups,
			comments: ''
		}

		axios.post('/api/words', data)
		.catch(error => console.log(error))
		this.props.onAddNote(data);
	}

	chooseGroup = (e) => {
		const value = e.target.value;
		const elem = this.props.store.dictionary_groups.filter((group) => 
			group.name === value
		)[0];
		this.setState({ selectedGroup: elem })
	}

	render(){
		console.log(this.state.selectedGroup);
		return (
			<div className="component col-xs-12">
				<Link to="/"><div className="component__logo"></div></Link>
				<div className="btn__dict_container">
					<div className="btn btn__dict btn__dict_add" onClick={this.showAddWindow}><i className="fas fa-plus"></i></div>
					<div className="btn btn__dict btn__dict_settings" onClick={this.showSettingsWindow}><i className="fas fa-ellipsis-h"></i></div>
				</div>

				{this.state.showAdd ? 
				<div className="add-note-window col-xs-10 col-xs-offset-1">
					<div className="add-note-window__header">Добавить запись <i className="fas fa-times" onClick={this.closeAddWindow}></i></div>
					<div className="add-note-window__body">
						<div className="col-xs-12 col-sm-4 add-note-window__block">
							<input type="text" placeholder="English word" id="english" />
						</div>
						<div className="col-xs-12 col-sm-4 add-note-window__block">
							<input type="text" placeholder="Deutsches Wort" id="german" />
						</div>
						<div className="col-xs-12 col-sm-4 add-note-window__block">
							<input type="text" placeholder="Русское слово" id="russian" />
						</div>

						<div className="add-note-window__optional">
							<div className="col-xs-6 col-sm-4 add-note-window__header_lesser">Дополнительно</div>
							<div className="clearfix"></div>
							<div className="col-xs-12 optional-groups">
								<span className="col-xs-4">Группа</span>
								<div className="col-xs-8">
									<select className="form-control setting-edit-window__selector" defaultValue="" onChange={this.chooseGroup}>
										<option disabled value="">Выберите группу</option>
										{this.props.store.dictionary_groups.map((group, index) => 
											<option key={"group"+index} value={group.name}>{group.name}</option>
										)}
									</select>
								</div>
							</div>
						</div>

						<div className="add-note-window__btn">
							<div className="btn btn__dict btn__dict_check" onClick={this.addNote}><i className="fas fa-check"></i></div>
						</div>

					</div>
				</div>
				: null }

				{this.state.showSettings ?
					<SettingsComponent 
						onClose={this.closeSettingsWindow}
					/>
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
						important={note.important}
					/>
				)}

				<div className="author-footer col-xs-12">&#169; Denis Moroz, 2018</div>
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
		},
		onAddGroup: (group) => {
			dispatch({ type: 'ADD_GROUP', payload: group })
		}
	})
)(DictionaryComponent);