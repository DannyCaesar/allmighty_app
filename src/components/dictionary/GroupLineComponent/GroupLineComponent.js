import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../../css/groupLineComponent.scss';

class GroupLineComponent extends Component {

	constructor(){
		super();
		this.state = {
			showWords: false
		}
	}

	conponentWillReceiveProps(nextProps){
		console.log(this.props.words);
	}

	deleteGroup = () => {
		const id = this.props.id;
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

	getWord = (word) => {
		const thisWord = this.props.store.dictionary_notes.filter((elem) => elem._id === word)[0];
		return thisWord;
	}

	removeWord = (e) => {
		const word_id = e.target.getAttribute('word_id');
		const group_id = this.props.id;

		axios.post('/api/groups/'+group_id, {id: word_id})
		.catch(error => console.log(error));
	
		this.props.onDeleteWordFromGroup(group_id, word_id);
		this.setState({ showWords: false }) //this is extra code for rerendering
	}

	render(){
		
		return (
			<div className="group-line">
				<div className="group-line__header col-xs-11 col-xs-offset-1">
					<div className="col-xs-4 group-line__header_elem">Название</div>
					<div className="col-xs-4 group-line__header_elem">Дата</div>
					<div className="col-xs-4 group-line__header_elem">Записей</div>
				</div>

				<div className="group-line__body col-xs-12">
					<div className="custom-btn group-line__btn group-line__btn_edit col-xs-1" data-toggle="tooltip" title="Изменить группу"><i className="fas fa-pen"></i></div>
					<div className="col-xs-11">
						<div className="col-xs-4">{this.props.name}</div>
						<div className="col-xs-4">{this.parseDate(this.props.adddate)}</div>
						<div className="col-xs-4 custom-btn group-line__btn_words" onClick={this.showWords}>{this.props.words.length}</div>
					</div>
				</div> 
				
				{this.state.showWords ? 
					this.props.words.length !== 0 ?
					<div className="col-xs-12 group-line__words">
						{this.props.words.map((word, index) => 
							<div key={`word${index}`} className="words__elem_container">
								<span className="words__elem" data-toggle="tooltip" title={`English: ${this.getWord(word).english}, german: ${this.getWord(word).german}, russian: ${this.getWord(word).russian}`}>
									{this.getWord(word).english}
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
	state => ({
		store: state
	}),
	dispatch => ({
		onRemoveGroup: (id) => {
			dispatch({ type: "REMOVE_GROUP", payload: id})
		},
		onDeleteWordFromGroup: (group_id, word_id) => {
			dispatch({ type: "DELETE_WORD_FROM_GROUP", group_id: group_id, word_id: word_id });
		}
	})
)(GroupLineComponent);