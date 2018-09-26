import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import LineSettingComponent from '../LineSettingComponent/LineSettingComponent';
import LineElementComponent from '../LineElementComponent/LineElementComponent';

import { onNoteUpdate, updateNoteSaga, removeNoteSaga } from '../../../redux/actions/dictionary/dictionary-notes-actions';
import { onDeleteWordFromGroup } from '../../../redux/actions/dictionary/dictionary-groups-actions';

import { selectDictionaryElementsShow } from '../../../redux/selectors/dictionary-selectors';

import './line-styles.scss';


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onDeleteWordFromGroup: onDeleteWordFromGroup,
		updateNoteSaga: updateNoteSaga,
		removeNoteSaga: removeNoteSaga
	}, dispatch)
}

function mapStateToProps(state) {
	return {
		dictionary_elements_show: selectDictionaryElementsShow(state)
	}
}

class LineComponent extends Component {
	static propTypes = {
		note: PropTypes.object.isRequired,
		removeNoteSaga: PropTypes.func.isRequired,
		updateNoteSaga: PropTypes.func.isRequired,
		dictionary_elements_show: PropTypes.bool.isRequired
	}

	constructor(props){
		super(props);
		this.state = {
			edit: false,
			showSettings: false
		}
	}

	remove = () => {
		this.props.removeNoteSaga(this.props.note);
	}

	edit = () => {
		this.setState({ edit: !this.state.edit });
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

	changeImportance = () => {
		const data = {
			note: this.props.note,
			change: 'important',
			value: !this.props.note.important
		};
		this.props.updateNoteSaga(data);
		this.setImportance(!this.state.important);
	}

	getExclamationClasses = () => {
		if (this.props.note.important) return "col-xs-1 line__status";
		else return "col-xs-1 line__status_pale";
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
							note={this.props.note}
							edit={this.state.edit}
						/>

						<LineElementComponent 
							language="german"
							value={this.props.note.german}
							note={this.props.note}
							edit={this.state.edit}
						/>

						<LineElementComponent 
							language="russian"
							value={this.props.note.russian}
							note={this.props.note}
							edit={this.state.edit}
						/>

						{this.state.showSettings ? 
							<LineSettingComponent 
								note={this.props.note}
								onClose={this.close}
								onSetImportance={this.setImportance}
							/>
						: null }

					</div>

					{!this.props.dictionary_elements_show ? 
						<div className="col-xs-1">
							<div className="btn_line-edit col-xs-4 xs-hidden" onClick={this.edit}><i className="fas fa-pen"></i></div>
							<div className="btn_line-remove col-xs-4 xs-hidden" onClick={this.remove}><i className="fas fa-trash-alt"></i></div>
							<div className="btn_line-settings col-xs-12 col-sm-4" onClick={this.showSettings}><i className="fas fa-cog"></i></div>
						</div>
					: null}

				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LineComponent);