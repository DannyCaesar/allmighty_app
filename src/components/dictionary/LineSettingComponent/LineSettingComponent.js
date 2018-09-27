import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddFormSimpleComponent from '../AddFormSimpleComponent/AddFormSimpleComponent';

import { updateNoteSaga, onNoteFormUpdate, removeNoteSaga, onAddNoteForm } from '../../../redux/actions/dictionary/dictionary-notes-actions';
import { onDeleteWordFromGroup } from '../../../redux/actions/dictionary/dictionary-groups-actions';

import { selectDictionaryNotes, selectDictionaryGroups } from '../../../redux/selectors/dictionary-selectors';

import './line-setting-styles.scss';


function mapStateToProps(state) {
	return {
		dictionary_notes: selectDictionaryNotes(state),
		dictionary_groups: selectDictionaryGroups(state)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		updateNoteSaga: updateNoteSaga,
		onNoteFormUpdate: onNoteFormUpdate,
		removeNoteSaga: removeNoteSaga,
		onAddNoteForm: onAddNoteForm,
		onDeleteWordFromGroup: onDeleteWordFromGroup,
	}, dispatch)
}

class LineSettingComponent extends Component {
	static propTypes = {
		note: PropTypes.object.isRequired,
		onClose: PropTypes.func.isRequired,
		onSetImportance: PropTypes.func.isRequired,
		dictionary_notes: PropTypes.array.isRequired,
		dictionary_groups: PropTypes.array.isRequired,
		updateNoteSaga: PropTypes.func,
		onNoteFormUpdate: PropTypes.func.isRequired,
		removeNoteSaga: PropTypes.func.isRequired,
		onAddNoteForm: PropTypes.func.isRequired,
		onDeleteWordFromGroup: PropTypes.func.isRequired
	}

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
		const word = this.props.dictionary_notes.filter((note) => 
			note._id === this.props.note._id
		)[0];
		this.setState({ forms: word.forms })
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.dictionary_notes !== nextProps.dictionary_notes) {
			const word = nextProps.dictionary_notes.filter((note) => 
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

	close = () => { this.props.onClose(false); }

	showForms = () => { this.setState({ showForms: !this.state.showForms }); }
	showGroups = () => { this.setState({ showGroups: !this.state.showGroups }); }

	setComment = (e) => { this.setState({ comment: e.target.value }); }

	importanceCheck = () => {
		this.setState({ importance: !this.state.importance });
		const update = { change: "important", value: !this.state.importance, note: this.props.note };
		this.props.updateNoteSaga(update);
		this.props.onSetImportance(!this.state.importance); // change color in LineComponent
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
		this.props.removeNoteSaga(this.props.note);
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
		const group = this.props.dictionary_groups.filter((group) => group._id === id)[0];
		return group.name;
	}

	render(){
		return (
			<div className="line-setting-component">
				<div className="line-setting-component__header">Additional settings <FontAwesomeIcon icon="times" onClick={this.close} /></div>
				<div className="line-setting-component__body col-xs-12">
					{!this.state.importance ? 
						<div className="line__btn line__btn_unimportant col-xs-12 col-sm-4" onClick={this.importanceCheck}>
							Mark as important
						</div>
					: 
						<div className="line__btn line__btn_important col-xs-12 col-sm-4" onClick={this.importanceCheck}>
							Mark as unimporatant
						</div>
					}


					{this.state.showForms ? 
						<div className="line__btn line__btn_active col-xs-12 col-sm-4" onClick={this.showForms}>
							<FontAwesomeIcon icon="times" />
						</div>
					:
						<div className="line__btn col-xs-12 col-sm-4" onClick={this.showForms}>
							Word forms
						</div>
					}

					{this.state.showGroups ? 
						<div className="line__btn line__btn_active col-xs-12 col-sm-4" onClick={this.showGroups}>
							<i className="fas fa-times"></i>
						</div>
					: 
						<div className="line__btn col-xs-12 col-sm-4" onClick={this.showGroups}>
							<i className="fas fa-angle-down toLeft xs-only"></i> Groups
						</div>
					}

					<div className="line-setting-component__extension col-xs-12">
						{this.state.showForms ? 
							<div className="extension__forms-window col-xs-12">

								{!this.state.addForm ?
									<div onClick={this.addForm} className="form-btn_add">Add new form <i className="fas fa-plus"></i></div>
								:
									<div onClick={this.addForm} className="form-btn_add">Cancel <i className="fas fa-times"></i></div>
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
								<div>No forms</div>
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
										<span className="col-xs-4">Group</span>
										<div className="col-xs-8">
											<select className="form-control setting-edit-window__selector" defaultValue="" onChange={this.chooseGroup}>
												<option disabled value="">Choose group</option>
												{this.props.dictionary_groups.map((group, index) => 
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
						<textarea className="form-control" placeholder="Comment" defaultValue={this.props.note.comment} onChange={this.setComment}></textarea>
					</div>

					<div className="col-xs-12">
						<div className="form-line__btn_delete" onClick={this.remove}>Delete</div>
					</div>
				</div>
			</div>
		)
	}
}



export default connect (
	mapStateToProps,
	mapDispatchToProps
)(LineSettingComponent);