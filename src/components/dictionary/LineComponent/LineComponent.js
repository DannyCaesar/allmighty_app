import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import LineSettingComponent from '../LineSettingComponent/LineSettingComponent';
import LineElementComponent from '../LineElementComponent/LineElementComponent';

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
		this.setState({ edit: true });
		this.setState({ editEnglish: true});
		this.setState({ editGerman: true });
		this.setState({ editRussian: true });
	}

	

	submitAllChanges = () => {
		this.submitChanges();
		this.setState({ edit: false });
		this.setState({ editEnglish: false });
		this.setState({ editGerman: false });
		this.setState({ editRussian: false });
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



	getExclamationClasses = () => {
		if (this.props.note.important) return "col-xs-1 line__status";
		else return "col-xs-1 line__status_pale";
	} 

	changeImportance = () => {
		const data = {
			note: this.props.note,
			change: 'important',
			value: !this.props.note.important
		};
		this.props.updateNoteSaga(data);
		//this.props.updateNoteSaga(this.props.note);


		/*this.props.onNoteUpdate({id: this.props.note._id, important: this.props.note.important });
		axios.post('/api/words/edit/'+this.props.note._id, {important: this.props.note.important })
		.catch(error => console.log(error));	*/
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

							<LineElementComponent 
								language="english"
								value={this.props.note.english}
							/>

							<LineElementComponent 
								language="german"
								value={this.props.note.german}
							/>

							<LineElementComponent 
								language="russian"
								value={this.props.note.russian}
							/>

							

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