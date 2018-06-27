import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../css/dict_line.scss';

class LineComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			english: '',
			german: '',
			russian: '',
			edit: false,
			editEnglish: false,
			editGerman: false,
			editRussian: false
		}
	}

	componentDidMount(){
		this.setState({ english: this.props.english });
		this.setState({ german: this.props.german });
		this.setState({ russian: this.props.russian });
	}

	remove = () => {
		const data = {
			english: this.state.english,
			german: this.state.german,
			russian: this.state.russian
		}

		axios.patch('/api/words',data)
		.catch(error => console.log(error));
		
		this.props.onRemoveNote(data);
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

	render(){
		return (
			<div className="component">
				<div className="line">
					<div className="col-xs-10 col-xs-offset-1">
					{this.state.editEnglish ?
						<div>
							<div className="col-xs-2"><input type="text" placeholder="english" value={this.state.english} onChange={this.changeEnglish} /></div>
							<div className="col-xs-1" onClick={this.submitEnglishChanges}>OK</div>
						</div>
					:
						<div className="col-xs-4 col-md-4 line__block" id={`${this.props.id}english`} onDoubleClick={this.editEnglish}>{this.state.english}</div>
					}

					{this.state.editGerman ? 
						<div>
							<div className="col-xs-2"><input type="text" placeholder="german" value={this.state.german} onChange={this.changeGerman} /></div>
							<div className="col-xs-1" onClick={this.submitGermanChanges}>OK</div>
						</div>
					: 
						<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"german"} onDoubleClick={this.editGerman}>{this.state.german}</div>
					}
					
					{this.state.editRussian ? 
						<div>
							<div className="col-xs-2"><input type="text" placeholder="russian" value={this.state.russian} onChange={this.changeRussian} /></div>
							<div className="col-xs-1" onClick={this.submitRussianChanges}>OK</div>
						</div>
					:
						<div className="col-xs-4 col-md-4 line__block" id={this.props.id+"russian"} onDoubleClick={this.editRussian}>{this.state.russian}</div>
					}
					</div>

					<div className="col-xs-1">
						{!this.state.edit ?
							<div className="btn_line-edit col-xs-4" onClick={this.edit}><i className="fas fa-pen"></i></div>
						:
							<div className="btn_line-check col-xs-4" onClick={this.submitAllChanges}><i className="fas fa-check"></i></div>
						}

						<div className="btn_line-remove col-xs-4" onClick={this.remove}><i className="fas fa-trash-alt"></i></div>

						<div className="btn_line-settings col-xs-4"><i className="fas fa-cog"></i></div>
					</div>

				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onRemoveNote: (note) => {
			dispatch({ type: "REMOVE_NOTE", payload: note });
		}
	})
)(LineComponent);