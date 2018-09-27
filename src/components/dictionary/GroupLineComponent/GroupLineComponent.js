import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { onRemoveGroup, onDeleteWordFromGroup } from '../../../redux/actions/dictionary/dictionary-groups-actions';
import { selectDictionaryNotes } from '../../../redux/selectors/dictionary-selectors';

import './group-line-styles.scss';



function mapStateToProps(state) {
	return {
		dictionary_notes: selectDictionaryNotes
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onRemoveGroup: onRemoveGroup,
		onDeleteWordFromGroup: onDeleteWordFromGroup
	}, dispatch)
}

class GroupLineComponent extends Component {

	static propTypes = {
		group: PropTypes.object.isRequired,
		deleteMessage: PropTypes.func.isRequired,
		onRemoveGroup: PropTypes.func.isRequired,
		onDeleteWordFromGroup: PropTypes.func.isRequired
	}

	constructor(){
		super();
		this.state = {
			showWords: false,
			editGroup: false
		}
	}

	deleteGroup = () => {
		const id = this.props.group._id;
		axios.delete(`/api/groups/${id}`)
		.then(response => {
			if ("success" in response.data) {
				this.props.deleteMessage(<div className="message_success" onClick={this.messageClose}>{response.data.success}</div>)
				this.props.onRemoveGroup(id);
				}
			else 
				this.props.message(<div className="message_error" onClick={this.messageClose}>{response.data.error}</div>)
		})
		.catch(error => console.log(error));
	}

	parseDate = (date) => {
		return date.replace("T", " ").substr(0, date.length - 5);
	}

	showWords = () => {
		this.setState({ showWords: !this.state.showWords });
	}

	removeWord = (e) => {
		const word_id = e.target.getAttribute('word_id');
		const group_id = this.props.group._id;

		axios.post('/api/groups/'+group_id, {id: word_id})
		.catch(error => console.log(error));
	
		this.props.onDeleteWordFromGroup(group_id, word_id);
		this.setState({ showWords: false }) //this is extra code for rerendering
	}

	editGroup = () => {
		this.setState({ editGroup: !this.state.editGroup });
	}

	render(){
		return (
			<div className="group-line">
				<div className="group-line__header col-xs-11 col-xs-offset-1">
					<div className="col-xs-4 group-line__header_elem">Name</div>
					<div className="col-xs-4 group-line__header_elem">Added</div>
					<div className="col-xs-4 group-line__header_elem">Words</div>
				</div>

				<div className="group-line__body col-xs-12">
					<div className="custom-btn group-line__btn group-line__btn_edit col-xs-1" data-toggle="tooltip" title="Edit group" onClick={this.editGroup}><i className="fas fa-pen"></i></div>
					<div className="col-xs-11">
						<div className="col-xs-4">{this.props.group.name}</div>
						<div className="col-xs-4">{this.parseDate(this.props.group.adddate)}</div>
						<div className="col-xs-4 custom-btn group-line__btn_words" onClick={this.showWords}>{this.props.group.words.length}</div>
					</div>
				</div> 
				
				{this.state.showWords ? 
					this.props.group.words.length !== 0 ?
					<div className="col-xs-12 group-line__words">
						{this.props.group.words.map((word, index) => 
							<div key={`word${index}`} className="words__elem_container">
								<span className="words__elem" data-toggle="tooltip" title={`English: ${word.english}, german: ${word.german}, russian: ${word.russian}`}>
									{word.english}
									<i className="fas fa-times" word_id={word} onClick={this.removeWord}></i>
								</span>
							</div>
						)}
					</div>
					: 
					<div className="group-line__words_message">Группа пуста</div>
				: null }

				<div className="group-line__btn group-line__btn_delete">
					<i className="fas fa-trash-alt" data-toggle="tooltip" title="Удалить группу" onClick={this.deleteGroup}></i>
				</div>

			</div>
		)
	}
}

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(GroupLineComponent);