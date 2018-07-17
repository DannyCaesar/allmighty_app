import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../css/groupLineComponent.scss';

class GroupLineComponent extends Component {

	constructor(){
		super();
		this.state = {
			showWords: false
		}
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
		return thisWord.english;
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
				
				{!this.state.showWords ? 
					<div className="col-xs-12 group-line__words">
						{this.props.words.map((word, index) => 
							<div key={`word${index}`} className="words__elem_container">
								<span className="words__elem">{this.getWord(word)}<i className="fas fa-times"></i></span>
							</div>
						)}
					</div>
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
		}
	})
)(GroupLineComponent);