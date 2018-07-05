import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import fs from 'fs';

import '../../css/settingsComponent.scss';

class SettingsComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			url: '',
			url_from: '/home/denismoroz/Desktop/',
			message: ''
		}
		this.fileName = '';
	}

	changeUrl = (e) => {
		this.setState({ url: e.target.value });
	}

	changeUrlFrom = (e) => {
		this.setState({ url_from: e.target.value });
	}

	load = () => {
		const data = JSON.stringify(this.props.store.dictionary_notes);
		axios.post('api/loadWords', {url: this.state.url})
		.then(response => {
			this.setState({message: <div className="message_success" onClick={this.messageClose}>{response.data}</div> })
		})
		.catch(error => console.log(error));

		setTimeout(() => { this.setState({message: ''}) }, 15000);
	}

	save = () => {
	//	axios.post('api/words', )
	}

	messageClose = () => {
		this.setState({message: ''});
	}

	getFile = () => {
		this.fileName = document.getElementById('loadFile').files[0].name;
	}

	hideElements = () => {
		this.props.onHideElements(document.getElementById('hideElements').checked);
	}

	render(){
		return (
			<div className="setting-window col-xs-10 col-xs-offset-1">
				<div className="setting-window__header">Настройки<i className="fas fa-times" onClick={this.closeSettingsWindow}></i></div>
				
				<div className="setting-window__message">
					{this.state.message}
				</div>
				
				<div className="setting-window__body col-xs-12">
					<div className="setting-window__block col-xs-12">
						<div className="setting-window__checkbox">
							<label htmlFor="hideElements">Скрыть элементы управления</label>
							<input id="hideElements" type="checkbox" onChange={this.hideElements} />
						</div>
					</div>

					<div className="setting-window__block col-xs-12">
						<div className="block-upload">
							<span className="col-xs-3">Выгрузить базу слов</span>
							<input className="col-xs-8" type="text" placeholder="Адрес выгрузки" value={this.state.url} onChange={this.changeUrl} />
							<div onClick={this.load}><i className="fas fa-download col-xs-1"></i></div>
						</div>
					</div>

					{/*<div className="setting-window__block col-xs-12">
						<div className="block-load">
							<span className="col-xs-3">Загрузить базу слов</span>
							<label htmlFor="loadFile" onClick={this.save}><i className="fas fa-download col-xs-1"></i></label>
							<input id="loadFile" className="col-xs-8" type="file" onChange={this.getFile} />
							<input className="col-xs-8" type="text" placeholder="Путь к файлу" value={this.state.url_from} onChange={this.changeUrlFrom} />
						</div>
					</div>*/
					}

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
		onHideElements: (status) => {
			dispatch({ type: 'HIDE_ELEMENTS', payload: status })
		}
	})
)(SettingsComponent);