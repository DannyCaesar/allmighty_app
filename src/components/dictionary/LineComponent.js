import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../css/dict_line.scss';

import LineSettingComponent from './LineSettingComponent';

class LineComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			english: '',
			german: '',
			russian: '',
			important: false,
			edit: false,
			editEnglish: false,
			editGerman: false,
			editRussian: false,
			showSettings: false
		}
	}

	componentDidMount(){
		this.setState({ english: this.props.english });
		this.setState({ german: this.props.german });
		this.setState({ russian: this.props.russian });
		this.setState({ important: this.props.important });
	}

	remove = () => {
		const data = {
			english: this.state.english,
			german: this.state.german,
			russian: this.state.russian
		}

		axios.delete('/api/delete/'+this.props.db_id)
		.catch(error => console.log(error));
		
		this.props.onRemoveNote(this.props.db_id);
	}

	edit = () => {
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
			english: this.state.english,
			german: this.state.german,
			russian: this.state.russian
		}

		axios.post('/api/words/edit/'+this.props.db_id, data)
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

	unimportant = () => {
		this.setState({ important: false })
		this.props.onNoteUpdate({id: this.props.db_id, important: false });

		axios.post('/api/words/edit/'+this.props.db_id, {important: false })
		.catch(error => console.log('error'));	
	}

	important = () => {
		this.setState({ important: true })
		this.props.onNoteUpdate({id: this.props.db_id, important: true });

		axios.post('/api/words/edit/'+this.props.db_id, {important: true })
		.catch(error => console.log('error'));	
	}

	render(){
		if (this.state.important) {
			return (
				<div className="component">
					<div className="line col-xs-12">

						<div className="col-xs-1 line__status" onClick={this.unimportant}>
							<span><i className="fas fa-exclamation"></i></span>
						</div>

						<div className="col-xs-10 line__element line_important">
						{this.state.editEnglish ?
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="english" value={this.state.english} onChange={this.changeEnglish} onKeyDown={this.keySubmitEnglishChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitEnglishChanges}><i className="fas fa-check"></i></div>
							</div>
						:
							<div className="col-xs-4 col-md-4 line__block" id={`${this.props.id}english`} onDoubleClick={this.editEnglish}>{this.state.english}</div>
						}

						{this.state.editGerman ? 
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="german" value={this.state.german} onChange={this.changeGerman} onKeyDown={this.keySubmitGermanChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitGermanChanges}><i className="fas fa-check"></i></div>
							</div>
						: 
							<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"german"} onDoubleClick={this.editGerman}>{this.state.german}</div>
						}
						
						{this.state.editRussian ? 
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="russian" value={this.state.russian} onChange={this.changeRussian} onKeyDown={this.keySubmitRussianChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitRussianChanges}><i className="fas fa-check"></i></div>
							</div>
						:
							<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"russian"} onDoubleClick={this.editRussian}>{this.state.russian}</div>
						}

						{this.state.showSettings ? 
							<LineSettingComponent 
								db_id={this.props.db_id}
								important={this.props.important}
								onClose={this.close}
								onSetImportance={this.setImportance}
							/>
						: null }
						</div>

						{!this.props.store.dictionary_elements_show ? 
						<div className="col-xs-1">
							{!this.state.edit ?
								<div className="btn_line-edit col-xs-4" onClick={this.edit}><i className="fas fa-pen"></i></div>
							:
								<div className="btn_line-check col-xs-4" onClick={this.submitAllChanges}><i className="fas fa-check"></i></div>
							}

							<div className="btn_line-remove col-xs-4" onClick={this.remove}><i className="fas fa-trash-alt"></i></div>

							<div className="btn_line-settings col-xs-4" onClick={this.showSettings}><i className="fas fa-cog"></i></div>
						</div>
						: null}

					</div>
				</div>
			)

		} else {
			return (
			
					<div className="line col-xs-12">

						<div className="col-xs-1 line__status_pale" onClick={this.important}>
							<span><i className="fas fa-exclamation"></i></span>
						</div>

						<div className="col-xs-10 line__element">
						{this.state.editEnglish ?
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="english" value={this.state.english} onChange={this.changeEnglish} onKeyDown={this.keySubmitEnglishChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitEnglishChanges}><i className="fas fa-check"></i></div>
							</div>
						:
							<div className="col-xs-4 col-md-4 line__block" id={`${this.props.id}english`} onDoubleClick={this.editEnglish}>{this.state.english}</div>
						}

						{this.state.editGerman ? 
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="german" value={this.state.german} onChange={this.changeGerman} onKeyDown={this.keySubmitGermanChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitGermanChanges}><i className="fas fa-check"></i></div>
							</div>
						: 
							<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"german"} onDoubleClick={this.editGerman}>{this.state.german}</div>
						}
						
						{this.state.editRussian ? 
							<div className="line__item col-xs-4">
								<div className="col-xs-11"><input type="text" placeholder="russian" value={this.state.russian} onChange={this.changeRussian} onKeyDown={this.keySubmitRussianChanges} /></div>
								<div className="col-xs-1 btn_check" onClick={this.submitRussianChanges}><i className="fas fa-check"></i></div>
							</div>
						:
							<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"russian"} onDoubleClick={this.editRussian}>{this.state.russian}</div>
						}

						{this.state.showSettings ? 
							<LineSettingComponent 
								db_id={this.props.db_id}
								important={this.props.important}
								onClose={this.close}
								onSetImportance={this.setImportance}
							/>
						: null }
						</div>

						{!this.props.store.dictionary_elements_show ? 
						<div className="col-xs-1">
							{!this.state.edit ?
								<div className="btn_line-edit col-xs-4" onClick={this.edit}><i className="fas fa-pen"></i></div>
							:
								<div className="btn_line-check col-xs-4" onClick={this.submitAllChanges}><i className="fas fa-check"></i></div>
							}

							<div className="btn_line-remove col-xs-4" onClick={this.remove}><i className="fas fa-trash-alt"></i></div>

							<div className="btn_line-settings col-xs-4" onClick={this.showSettings}><i className="fas fa-cog"></i></div>
						</div>
						: null }
					</div>
				
			)
		}
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onRemoveNote: (note) => {
			dispatch({ type: "REMOVE_NOTE", payload: note });
		},
		onNoteUpdate: (note) => {
			dispatch({ type: "UPDATE_NOTE", payload: note });
		}
	})
)(LineComponent);