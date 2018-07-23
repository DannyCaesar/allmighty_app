import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AddFormSimpleComponent from './AddFormSimpleComponent';

import '../../css/addWordComponent.scss';

class AppWordComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			selectedGroup: '',
			formsCounter: [],
			wordForms: [],
			english: '',
			german: '',
			russian: '',
			comment: ''
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.state.formsCounter !== nextState.formsCounter || this.state.wordForms !== nextState.wordForms ||
				this.props.store.dictionary_groups !== nextProps.store.dictionary_groups);
	}

	setEnglish = (e) => { this.setState({ english: e.target. value }) }
	setGerman = (e) => { this.setState({ german: e.target. value }) }
	setRussian = (e) => { this.setState({ russian: e.target. value }) }
	setComment = (e) => { this.setState({ comment: e.target. value }) }

	addForm = () => {
		this.setState({ formsCounter: this.state.formsCounter.concat(['form']) })
	}

	chooseGroup = (e) => {
		const value = e.target.value;
		const elem = this.props.store.dictionary_groups.filter((group) => 
			group.name === value
		)[0];
		this.setState({ selectedGroup: elem })
	}

	closeAddWindow = () => {
		this.props.close(false);
	}

	getWordForm = (value) => {
		if (value.status === "add") {
		 	this.setState({ wordForms: this.state.wordForms.concat(value) })
		}
		if (value.status === "remove") {
			const newWordsArr = this.state.wordForms.filter((form) => form.id !== value.id);
			this.setState({ wordForms: newWordsArr });
			this.setState({ formsCounter: this.state.formsCounter.slice(1,this.state.formsCounter.length) });
		}

	}

	addNote = () => {
		const german = this.state.german;
		const english = this.state.english;
		const russian = this.state.russian;
		const comment = this.state.comment;
		const forms = this.state.wordForms.map((form) => {
			return form.word
		})

		let groups = this.state.selectedGroup;

		const data = {
			english: english,
			german: german,
			russian: russian,
			dateAdd: new Date(),
			important: false,
			comment: comment,
			forms: forms,
			groups: groups._id
		}
		
		console.log(data);

		axios.post('/api/words', data)
		.then((response) => {
			const in_data = response.data;

			axios.get('/api/words/'+ in_data.word_id)
			.then(res => this.props.onAddNote(res.data))
			.catch(error => console.log(error))

			axios.get('/api/groups/' + in_data.group_id)
			.then(res => this.props.onUpdateGroup(res.data))
			.catch(error => console.log(error))
		})
		.catch(error => console.log(error))

		this.props.close('added');
	}


	render(){
		return (
			<div className="add-note-window col-xs-10 col-xs-offset-1">
				<div className="add-note-window__header">Добавить запись <i className="fas fa-times" onClick={this.closeAddWindow}></i></div>
				<div className="add-note-window__body">
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="English word" id="english" onChange={this.setEnglish} />
					</div>
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="Deutsches Wort" id="german" onChange={this.setGerman} />
					</div>
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="Русское слово" id="russian" onChange={this.setRussian} />
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

					<div className="col-xs-12 optional-forms">
						<div className="col-sm-4 col-xs-12 optional-forms__header">
							<span onClick={this.addForm}><i className="fas fa-plus"></i> Добавить форму слова</span>
						</div>
						<div className="clearfix"></div>
						{this.state.formsCounter.map((form, index) => 
							<AddFormSimpleComponent 
								key={`form${index}`}
								wordForm={this.getWordForm}
							/>
									
						)}
					</div>

					<div className="col-xs-12 optional-comment">
						<div className="col-xs-10 col-xs-offset-1">
							<textarea className="form-control" placeholder="Комментарий" onChange={this.setComment}></textarea>
						</div>
					</div>

					<div className="add-note-window__btn">
						<div className="btn btn__dict btn__dict_check" onClick={this.addNote}><i className="fas fa-check"></i></div>
					</div>

				</div>
				</div>
			</div>
		)
	}
}

export default connect (
	state => ({
		store: state
	}),
	dispatch => ({
		onAddNote: (note) => {
			dispatch({ type: 'ADD_NOTE', payload: note })
		},
		onUpdateGroup: (group) => {
			dispatch({ type: 'UPDATE_GROUP', payload: group })
		}
	})
)(AppWordComponent);