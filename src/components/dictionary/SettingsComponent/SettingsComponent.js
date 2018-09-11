import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import fs from 'fs';

import '../../../css/settingsComponent.scss';
import GroupLineComponent from '../GroupLineComponent/GroupLineComponent';


class SettingsComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			url: '',
			url_from: '/home/denismoroz/Desktop/',
			message: '',
			showEditWindow: false,
			showSortWindow: false,
			showAddGroupWindow: false,
			selectedGroup: "",
			groupName: ''
		}
		this.fileName = '';
	}

	componentDidMount(){
		if (this.props.store.dictionary_elements_show)
			document.getElementById('hideElements').checked = true;
		if (this.props.store.dictionary_hidden.english) 
			document.getElementById('hideEnglish').checked = true;
		if (this.props.store.dictionary_hidden.german) 
			document.getElementById('hideGerman').checked = true;
		if (this.props.store.dictionary_hidden.russian) 
			document.getElementById('hideRussian').checked = true;
	}

	changeUrl = (e) => {
		this.setState({ url: e.target.value });
	}

	changeUrlFrom = (e) => {
		this.setState({ url_from: e.target.value });
	}

	load = () => {
		const data = JSON.stringify(this.props.store.dictionary_notes);
		axios.post('/api/words/loadWords', {url: this.state.url})
		.then(response => {
			this.setState({message: <div className="message_success" onClick={this.messageClose}>{response.data}</div> })
		})
		.catch(error => console.log(error));

		setTimeout(() => { this.setState({message: ''}) }, 15000);
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

	closeSettingsWindow = () => {
		this.props.onClose(false);
	}

	chooseGroup = (e) => {
		const value = e.target.value;
		const elem = this.props.store.dictionary_groups.filter((group) => 
			group.name === value
		)[0];
		this.setState({ selectedGroup: elem })
	}

	showGroups = () => {
		this.setState({ showEditWindow: !this.state.showEditWindow })
	}

	addGroupWindow = () => {
		this.setState({ showAddGroupWindow: !this.state.showAddGroupWindow })
	}

	addGroup = () => {
		axios.post('/api/groups', { name: this.state.groupName })
		.then(response => {
			if ("success" in response.data) {
				this.setState({message: <div className="message_success" onClick={this.messageClose}>{response.data.success}</div> })
				this.setState({ showAddGroupWindow: false });
				axios.get('/api/groups')
				.then(response => {
					const dataFetched = response.data;
					dataFetched.forEach((item) => {
						if (item.name === this.state.groupName) this.props.onAddGroup(item)
					})
				})
				.catch(error => console.log(error))
				}
			else 
				this.setState({message: <div className="message_error" onClick={this.messageClose}>{response.data.error}</div> })
		})
		.catch(error => console.log(error));

		setTimeout(() => { this.setState({message: ''}) }, 15000);
	}

	setGroupName = (e) => {
		this.setState({ groupName: e.target.value })
	}

	getDeleteMessage = (value) => {
		this.setState({ message: value });
		this.setState({ selectedGroup: "" });
	}

	hideEnglish = () => {
		this.props.onHide("english");
	}

	hideGerman = () => {
		this.props.onHide("german");
	}

	hideRussian = () => {
		this.props.onHide("russian");
	}

	render(){
		return (
			<div className="setting-window col-xs-10 col-xs-offset-1">

				<div className="setting-window__header">Настройки<i className="fas fa-times" onClick={this.closeSettingsWindow}></i></div>
				
				<div className="setting-window__message">
					{this.state.message}
				</div>
				
				<div className="setting-window__body col-xs-12">
					
					<div className="setting-window__checkbox">
						<label htmlFor="hideElements">Скрыть элементы управления</label>
						<input id="hideElements" type="checkbox" onChange={this.hideElements} />
					</div>

					<div className="setting-window__block">
						<div className="block-upload">
							<span className="col-sm-3 col-xs-12">Выгрузить базу слов</span>
							<input className="col-sm-8 col-xs-10" type="text" placeholder="Адрес выгрузки" value={this.state.url} onChange={this.changeUrl} />
							<div onClick={this.load}><i className="fas fa-download col-xs-1"></i></div>
						</div>
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideEnglish">Скрыть слова на английском</label>
						<input id="hideEnglish" type="checkbox" onChange={this.hideEnglish} />
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideGerman">Скрыть слова на немецком</label>
						<input id="hideGerman" type="checkbox" onChange={this.hideGerman} />
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideRussian">Скрыть слова на русском</label>
						<input id="hideRussian" type="checkbox" onChange={this.hideRussian} />
					</div>

					<div className="setting-window__block">
						<div className="block-clever">
							<div className="block-clever__control col-xs-12">
								{!this.state.showEditWindow ?
									<div className="custom-btn btn__setting col-xs-12 col-sm-3" onClick={this.showGroups}>Редактировать группы</div>
								:
									<div className="custom-btn btn__setting btn__setting_close col-xs-12 col-sm-3" onClick={this.showGroups}><i className="fas fa-times"></i></div>
								}

								{this.state.showEditWindow ?
								<div className="setting-edit-window">
									<div className="col-xs-12 setting-edit-window__select">
										<span className="col-xs-3 setting-edit-window__label">Группа</span>
										<div className="col-xs-7">
											<select className="form-control setting-edit-window__selector" id="group_selector" defaultValue={this.state.selectedGroup} onChange={this.chooseGroup}>
												<option disabled value="">Выберите группу</option>
												{this.props.store.dictionary_groups.map((group, index) => 
													<option key={"group"+index} value={group.name}>{group.name}</option>
												)}
											</select>
										</div>
										{!this.state.showAddGroupWindow ?
											<div className="col-xs-1 btn btn__dict btn__dict_add btn__dict_groups" onClick={this.addGroupWindow}>
												<i className="fas fa-plus"></i>
											</div>
										:
											<div className="col-xs-1 btn btn__dict btn__dict_close btn__dict_groups" onClick={this.addGroupWindow}>
												<i className="fas fa-times"></i>
											</div>
										}
									</div>

									{this.state.showAddGroupWindow ?
						
											<div className="setting-edit-window__block col-xs-12">
												<span className="edit-window-block__header col-xs-12">Добавить группу</span>
												<input type="text" placeholder="Название" className="col-xs-10 col-xs-offset-1" onChange={this.setGroupName} />
												<i className="fas fa-check col-md-1 col-xs-12" onClick={this.addGroup}></i>
											</div>
								
									: null}


									{this.state.selectedGroup !== '' ?
										<GroupLineComponent 
											id = {this.state.selectedGroup._id}
											adddate = {this.state.selectedGroup.adddate}
											name = {this.state.selectedGroup.name}
											words = {this.state.selectedGroup.words}
											deleteMessage={this.getDeleteMessage}
										/>
									: null }

								</div>

								: null }

								<div className="custom-btn btn__setting col-xs-12 col-sm-3">Сортировать</div>
							</div>

							

						</div>
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
		onHideElements: (status) => {
			dispatch({ type: 'HIDE_ELEMENTS', payload: status })
		},
		onAddGroup: (group) => {
			dispatch({ type: 'ADD_GROUP', payload: group })
		},
		onHide: (language) => {
			dispatch({ type: 'HIDE_COLUMN', payload: language })
		}
	})
)(SettingsComponent);