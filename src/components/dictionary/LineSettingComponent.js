import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AddFormSimpleComponent from './AddFormSimpleComponent';
import '../../css/line_setting.scss';

class LineSettingComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			importance: this.props.important,
			comment: '',
			showForms: false,
			showGroups: false,
			addForm: false
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.importance !== nextState.importance || this.props.important !== nextProps.important ||
			this.state.showForms !== nextState.showForms || this.state.showGroups !== nextState.showGroups ||
			this.state.addForm !== nextState.addForm;
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

	addForm = () => {
		this.setState({ addForm: !this.state.addForm })
	}

	render(){
		console.log(this.state.addForm);
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

								{!this.state.addForm ?
									<div onClick={this.addForm} className="form-btn_add">Добавить форму <i className="fas fa-plus"></i></div>
								:
									<div onClick={this.addForm} className="form-btn_add">Отменить <i className="fas fa-times"></i></div>
								}

							{this.props.forms !== undefined ? 
									this.props.forms.map((form, index) => 
									index % 2 === 0 ? 
									<div className="form-line form-line_even col-xs-12" key={`form${index}`}>
										<div className="col-xs-11">
											<div className="form-line__element col-sm-3 col-xs-4">{form.english}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.german}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.russian}</div>
											<div className="form-line__element col-sm-3 col-xs-12">{form.comment}</div>
										</div>
										<div className="col-xs-1"><i className="fas fa-trash-alt"></i></div>
									</div>
									:
									<div className="form-line form-line_odd col-xs-12" key={`form${index}`}>
										<div className="col-xs-11">
											<div className="form-line__element col-sm-3 col-xs-4">{form.english}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.german}</div>
											<div className="form-line__element col-sm-3 col-xs-4">{form.russian}</div>
											<div className="form-line__element col-sm-3 col-xs-12">{form.comment}</div>
										</div>
										<div className="col-xs-1"><i className="fas fa-trash-alt"></i></div>
									</div>
									)
									/*<table className="form-line">
										<thead>
											<tr>
												<th>English</th>
												<th>Deutsch</th>
												<th>Русский</th>
												<th>Комментарий</th>
											</tr>
										</thead>
										<tbody>	
											{this.props.forms.map((form, index) => 
											<tr key={`form${index}`}>
												<td className="form-line__element">{form.english}</td>
												<td className="form-line__element">{form.german}</td>
												<td className="form-line__element">{form.russian}</td>
												<td className="form-line__element">{form.comment}</td>
												<td>D</td>
											</tr>
											)}
										</tbody>
									</table> */
								
							:
								<div>Нет форм</div>
							}

								{this.state.addForm ?
									<AddFormSimpleComponent 
										lineSetting={true}
									/>
								: null }

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