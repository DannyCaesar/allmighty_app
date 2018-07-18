import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../css/line_setting.scss';

class LineSettingComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			importance: this.props.important,
			comment: '',
			showForms: false,
			showGroups: false
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.importance !== nextState.importance || this.props.important !== nextProps.important ||
			this.state.showForms !== nextState.showForms || this.state.showGroups !== nextState.showGroups;
	}

	importanceCheck = () => {
		this.setState({ importance: !this.state.importance });
		this.props.onNoteUpdate({id: this.props.db_id, important: !this.state.importance });

		this.props.onSetImportance(!this.state.importance);

		axios.post('/api/words/edit/'+this.props.db_id, {important: !this.state.importance})
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
							Формы слова
						</div>
					}

					{this.state.showGroups ? 
						<div className="line__btn line__btn_active col-xs-12 col-sm-4" onClick={this.showGroups}>
							<i className="fas fa-times"></i>
						</div>
					: 
						<div className="line__btn col-xs-12 col-sm-4" onClick={this.showGroups}>
							Группы
						</div>
					}

					<div className="line-setting-component__extension col-xs-12">
						{this.state.showForms ? 
							<div className="extension__forms-window col-xs-12">
								test
							</div>
						: null}

						{this.state.showGroups ? 
							<div className="extension__groups-window col-xs-12">
								test
							</div>
						: null}
					</div>

					<div className="col-xs-12">
						<textarea className="form-control" placeholder="Комментарий" defaultValue={this.props.comment} onChange={this.setComment}></textarea>
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
		}
	})
)(LineSettingComponent);