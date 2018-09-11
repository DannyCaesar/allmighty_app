import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AddFormSimpleComponent from '../AddFormSimpleComponent/AddFormSimpleComponent';
import '../../../css/line_setting.scss';

class LineSettingComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			importance: this.props.note.important,
			comment: '',
			forms: [],
			showForms: false,
			showGroups: false,
			addForm: false,
			message: '',
			selectedGroup: '',
		}
	}

	componentDidMount(){
		const word = this.props.store.dictionary_notes.filter((note) => 
			note._id === this.props.note._id
		)[0];
		this.setState({ forms: word.forms })
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.store.dictionary_notes !== nextProps.store.dictionary_notes) {
			const word = nextProps.store.dictionary_notes.filter((note) => 
				note._id === this.props.note._id
			)[0];
			this.setState({ forms: word.forms  })
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.importance !== nextState.importance || this.props.note.important !== nextProps.note.important ||
			this.state.showForms !== nextState.showForms || this.state.showGroups !== nextState.showGroups ||
			this.state.addForm !== nextState.addForm || this.state.forms !== nextState.forms;
	}

	importanceCheck = () => {
		this.setState({ importance: !this.state.importance });
		this.props.onNoteUpdate({id: this.props.note._id, important: !this.state.importance });

		this.props.onSetImportance(!this.state.importance);

		axios.post('/api/words/edit/'+this.props.note._id, {important: !this.state.importance})
		.catch(error => console.log(error));	
	}

	close = () => {
		this.props.onClose(false);
	}

	setComment = (e) => {
		this.setState({ comment: e.target.value })
	}

	showForms = () => {
		this.setState({ showForms: !this.state.showForms })
	}

	showGroups = () => {
		this.setState({ showGroups: !this.state.showGroups })
	}

	addForm = () => {
		this.setState({ addForm: !this.state.addForm })
	}

	deleteForm = (e) => {
		const id = e.target.getAttribute('form_id');
		axios.put('/api/forms/' + id, {word_id: this.props.note._id})
		.then(response => {
			//console.log(response.data);
		})
		.catch(error => "Error deleting form: " + error);

		this.props.onNoteFormUpdate(this.props.note._id, id);
	}

	remove = () => {
		axios.delete('/api/words/'+this.props.note._id)
		.then(response => {
			const thisGroup = this.props.store.dictionary_groups.filter((group) => group._id === this.props.note.groups)[0];
			this.props.onDeleteWordFromGroup(thisGroup, this.props.note._id);
		})
		.catch(error => console.log(error));
		
		this.props.onRemoveNote(this.props.note._id);
	}

	addNewForm = (data) => {
		const word_id = this.props.note._id;
		const form = data.word;
		this.props.onAddNoteForm(word_id, form);
		this.setState({ addForm: false });

		axios.post('/api/words/edit/'+this.props.note._id, { form: form })
		.catch(error => "Error on adding new form: " + error)
	}

	getGroupName = (id) => {
		const group = this.props.store.dictionary_groups.filter((group) => group._id === id)[0];
		return group.name;
	}

	render(){
		return (
			<div className="line-setting-component">
				<div className="line-setting-component__header">Дополнительные настройки <i className="fas fa-times" onClick={this.close}></i></div>
				<div className="line-setting-component__body col-xs-12">
					{!this.state.importance ? 
						<div className="line__btn line__btn_unimportant col-xs-12 col-sm-4" onClick={this.importanceCheck}>
							Пометить, как важное
						</div>
					: 
						<div className="line__btn line__btn_important col-xs-12 col-sm-4" onClick={this.importanceCheck}>
							Пометить, как неважное
						</div>
					}


					{this.state.showForms ? 
						<div className="line__btn line__btn_active col-xs-12 col-sm-4" onClick={this.showForms}>
							<i className="fas fa-times"></i>
						</div>
					:
						<div className="line__btn col-xs-12 col-sm-4" onClick={this.showForms}>
							<i className="fas fa-angle-down toLeft xs-only"></i> Формы слова
						</div>
					}

					{this.state.showGroups ? 
						<div className="line__btn line__btn_active col-xs-12 col-sm-4" onClick={this.showGroups}>
							<i className="fas fa-times"></i>
						</div>
					: 
						<div className="line__btn col-xs-12 col-sm-4" onClick={this.showGroups}>
							<i className="fas fa-angle-down toLeft xs-only"></i> Группы
						</div>
					}

					<div className="line-setting-component__extension col-xs-12">
						{this.state.showForms ? 
							<div className="extension__forms-window col-xs-12">

								{!this.state.addForm ?
									<div onClick={this.addForm} className="form-btn_add">Добавить форму <i className="fas fa-plus"></i></div>
								:
									<div onClick={this.addForm} className="form-btn_add">Отменить <i className="fas fa-times"></i></div>
								}

							{this.state.forms !== undefined ? 
									this.state.forms.map((form, index) => 
									index % 2 === 0 ? 
									<div className="form-line form-line_even col-xs-12" key={`form${index}`}>
										<div className="col-xs-11">
											<div className="form-line__element col-sm-3 col-xs-4">{form.english}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.german}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.russian}</div>
											<div className="form-line__element col-sm-3 col-xs-12">{form.comment}</div>
										</div>
										<div className="col-xs-1"><i className="fas fa-trash-alt" form_id={form.id} onClick={this.deleteForm}></i></div>
									</div>
									:
									<div className="form-line form-line_odd col-xs-12" key={`form${index}`}>
										<div className="col-xs-11">
											<div className="form-line__element col-sm-3 col-xs-4">{form.english}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.german}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.russian}</div>
											<div className="form-line__element col-sm-3 col-xs-12">{form.comment}</div>
										</div>
										<div className="col-xs-1"><i className="fas fa-trash-alt" form_id={form.id} onClick={this.deleteForm}></i></div>
									</div>
									)
							:
								<div>Нет форм</div>
							}

								{this.state.addForm ?
									<AddFormSimpleComponent 
										lineSetting={true}
										newForm={this.addNewForm}
									/>
								: null }

							</div>
						: null}

						{this.state.showGroups ? 
							<div className="extension__groups-window">
								{this.props.note.groups.length !== 0 ?
									<div className="group-block__list">
										<div className="group-block">{this.getGroupName(this.props.note.groups)} <i className="fas fa-times"></i></div>
									</div>
								:
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
								}
							</div>
						: null}
					</div>

					<div className="col-xs-12">
						<textarea className="form-control" placeholder="Комментарий" defaultValue={this.props.note.comment} onChange={this.setComment}></textarea>
					</div>

					<div className="col-xs-12">
						<div className="form-line__btn_delete" onClick={this.remove}>Удалить запись</div>
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
		onNoteUpdate: (note) => {
			dispatch({ type: "UPDATE_NOTE", payload: note });
		},
		onNoteFormUpdate: (word_id, form_id) => {
			dispatch({ type: "UPDATE_NOTE_FORMS", word_id: word_id, form_id: form_id })
		},
		onDeleteWordFromGroup: (group, word_id) => {
			dispatch({ type: "DELETE_WORD_FROM_GROUP", group: group, word_id: word_id });
		},
		onRemoveNote: (note) => {
			dispatch({ type: "REMOVE_NOTE", payload: note });
		},
		onAddNoteForm: (word_id, form) => {
			dispatch({ type: 'ADD_NOTE_FORM', word_id: word_id, form: form })
		}
	})
)(LineSettingComponent);