import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import LineSettingComponent from '../LineSettingComponent/LineSettingComponent';

import { onRemoveNote, onNoteUpdate, updateNoteSaga } from '../../../redux/actions/dictionary/dictionary-notes-actions';
import { onDeleteWordFromGroup } from '../../../redux/actions/dictionary/dictionary-groups-actions';

import './line-styles.scss';

class LineComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			edit: false,
			editEnglish: false,
			editGerman: false,
			editRussian: false,
			showSettings: false,
			hideEnglish: false,
			hideGerman: false,
			hideRussian: false
		}
	}

	componentDidMount(){
		this.setState({ hideEnglish: this.props.store.dictionary_hidden.english });
		this.setState({ hideGerman: this.props.store.dictionary_hidden.german });
		this.setState({ hideRussian: this.props.store.dictionary_hidden.russian });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.store.dictionary_hidden !== nextProps.store.dictionary_hidden) {
			if (nextProps.store.dictionary_hidden.english !== this.state.hideEnglish) this.setState({ hideEnglish: nextProps.store.dictionary_hidden.english})
			if (nextProps.store.dictionary_hidden.german !== this.state.hideGerman) this.setState({ hideGerman: nextProps.store.dictionary_hidden.german})
			if (nextProps.store.dictionary_hidden.russian !== this.state.hideRussian) this.setState({ hideRussian: nextProps.store.dictionary_hidden.russian})
		}
	}


	remove = () => {

		axios.delete('/api/words/'+this.props.note._id)
		.then(response => {
			const thisGroup = this.props.store.dictionary_groups.filter((group) => group._id === this.props.groups)[0];
			this.props.onDeleteWordFromGroup(thisGroup, this.props.note._id);
		})
		.catch(error => console.log(error));
		
		this.props.onRemoveNote(this.props.note._id);
	}

	edit = () => {
		//console.log(window.innerWidth);
		this.setState({ edit: true });
		this.setState({ editEnglish: true});
		this.setState({ editGerman: true });
		this.setState({ editRussian: true });
	}

	editEnglish = () => { this.setState({ editEnglish: true }) }
	editGerman = () => { this.setState({ editGerman: true }) }
	editRussian = () => { this.setState({ editRussian: true }) }

	changeEnglish = (e) => { this.setState({ english: e.target.value }) }
	changeGerman = (e) => { this.setState({ german: e.target.value }) }
	changeRussian = (e) => { this.setState({ russian: e.target.value }) }

	submitEnglishChanges = () => {
		this.submitChanges();
		this.setState({ editEnglish: false });
	}

	submitGermanChanges = () => {
		this.submitChanges();
		this.setState({ editGerman: false });
	}

	submitRussianChanges = () => {
		this.submitChanges();
		this.setState({ editRussian: false });
	}

	keySubmitEnglishChanges = (e) => {
		if (e.keyCode === 13 || e.keyCode === 27)
			this.submitEnglishChanges();
	}

	keySubmitGermanChanges = (e) => {
		if (e.keyCode === 13 || e.keyCode === 27)
			this.submitGermanChanges();
	}

	keySubmitRussianChanges = (e) => {
		if (e.keyCode === 13 || e.keyCode === 27)
			this.submitRussianChanges();
	}


	submitAllChanges = () => {
		this.submitChanges();
		this.setState({ edit: false });
		this.setState({ editEnglish: false });
		this.setState({ editGerman: false });
		this.setState({ editRussian: false });
	}

	submitChanges = () => {
		const data = {
			english: this.props.note.english,
			german: this.props.note.german,
			russian: this.props.note.russian
		}

		axios.post('/api/words/edit/'+this.props.note._id, data)
		.catch(error => console.log(error));
	}

	showSettings = () => {
		this.setState({ showSettings: !this.state.showSettings })
	}

	close = (value) => {
		this.setState({ showSettings: value })
	}

	setImportance = (value) => {
		this.setState({ important: value })
	}


	showEnglish = () => {
		this.setState({ hideEnglish: false })
	}

	showGerman = () => {
		this.setState({ hideGerman: false })
	}

	showRussian = () => {
		this.setState({ hideRussian: false })
	}


	getExclamationClasses = () => {
		if (this.props.note.important) return "col-xs-1 line__status";
		else return "col-xs-1 line__status_pale";
	} 

	changeImportance = () => {
		this.props.updateNoteSaga(this.props.note);
		this.props.onNoteUpdate({id: this.props.note._id, important: this.props.note.important });
		axios.post('/api/words/edit/'+this.props.note._id, {important: this.props.note.important })
		.catch(error => console.log(error));	
	}

	getLineClasses = () => {
		if (this.props.note.important) return "col-xs-10 line__element line_important";
		else return "col-xs-10 line__element";
	}

	render(){

			return (
				<div className="component">
					<div className="line col-xs-12">

						<div className={this.getExclamationClasses()} onClick={this.changeImportance}>
							<span><i className="fas fa-exclamation"></i></span>
						</div>

						<div className={this.getLineClasses()}>
						
						{!this.state.hideEnglish ?
							this.state.editEnglish ?
								<div className="line__item col-xs-4">
									<div className="col-xs-11"><input type="text" placeholder="english" value={this.props.note.english} onChange={this.changeEnglish} onKeyDown={this.keySubmitEnglishChanges} /></div>
									<div className="col-xs-1 btn_check" onClick={this.submitEnglishChanges}><i className="fas fa-check"></i></div>
								</div>
							:
								<div className="col-xs-4 col-md-4 line__block" id={`${this.props.id}english`} onDoubleClick={this.editEnglish}>{this.props.note.english}</div>
						: <div className="col-xs-4 col-md-4 line__block line__block_hidden" onClick={this.showEnglish}>{this.props.note.english}</div>
						}


						{!this.state.hideGerman ? 
							this.state.editGerman ? 
								<div className="line__item col-xs-4">
									<div className="col-xs-11"><input type="text" placeholder="german" value={this.props.note.german} onChange={this.changeGerman} onKeyDown={this.keySubmitGermanChanges} /></div>
									<div className="col-xs-1 btn_check" onClick={this.submitGermanChanges}><i className="fas fa-check"></i></div>
								</div>
							: 
								<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"german"} onDoubleClick={this.editGerman}>{this.props.note.german}</div>
						: <div className="col-xs-4 col-md-4 line__block line__block_hidden" onClick={this.showGerman}>{this.props.note.german}</div>
						}
						
						{!this.state.hideRussian ? 
							this.state.editRussian ? 
								<div className="line__item col-xs-4">
									<div className="col-xs-11"><input type="text" placeholder="russian" value={this.props.note.russian} onChange={this.changeRussian} onKeyDown={this.keySubmitRussianChanges} /></div>
									<div className="col-xs-1 btn_check" onClick={this.submitRussianChanges}><i className="fas fa-check"></i></div>
								</div>
							:
								<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"russian"} onDoubleClick={this.editRussian}>{this.props.note.russian}</div>
						: <div className="col-xs-4 col-md-4 line__block line__block_hidden" onClick={this.showRussian}>{this.props.note.russian}</div>
						}

						{this.state.showSettings ? 
							<LineSettingComponent 
								db_id={this.props.note._id}
								important={this.props.note.important}
								comment={this.props.note.comment}
								forms={this.props.note.forms}
								groups={this.props.note.groups}
								onClose={this.close}
								onSetImportance={this.setImportance}
							/>
						: null }
						</div>

						{!this.props.store.dictionary_elements_show ? 
						<div className="col-xs-1">
							{!this.state.edit ?
								<div className="btn_line-edit col-xs-4 xs-hidden" onClick={this.edit}><i className="fas fa-pen"></i></div>
							:
								<div className="btn_line-check col-xs-4 xs-hidden" onClick={this.submitAllChanges}><i className="fas fa-check"></i></div>
							}

							<div className="btn_line-remove col-xs-4 xs-hidden" onClick={this.remove}><i className="fas fa-trash-alt"></i></div>

							<div className="btn_line-settings col-xs-12 col-sm-4" onClick={this.showSettings}><i className="fas fa-cog"></i></div>
						</div>
						: null}

					</div>
				</div>
			)

	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		onRemoveNote: onRemoveNote,
		onNoteUpdate: onNoteUpdate,
		onDeleteWordFromGroup: onDeleteWordFromGroup,
		updateNoteSaga: updateNoteSaga
	}, dispatch)
}

export default connect(
	state => ({
		store: state
	}),
	mapDispatchToProps
)(LineComponent);