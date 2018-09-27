import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import fs from 'fs';

import GroupLineComponent from '../GroupLineComponent/GroupLineComponent';

import { addGroupSaga } from '../../../redux/actions/dictionary/dictionary-groups-actions';
import { onHideElements, onHide } from '../../../redux/actions/dictionary/dictionary-others-actions';

import { selectDictionaryElementsShow, selectDictionaryHidden, selectDictionaryGroups } from '../../../redux/selectors/dictionary-selectors';

import './settings-styles.scss';


function mapStateToProps(state) {
	return {
		dictionary_elements_show: selectDictionaryElementsShow(state),
		dictionary_hidden: selectDictionaryHidden(state),
		dictionary_groups: selectDictionaryGroups(state)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addGroupSaga: addGroupSaga,
		onHideElements: onHideElements,
		onHide: onHide
	}, dispatch);
}


class SettingsComponent extends Component {
	
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		dictionary_elements_show: PropTypes.bool.isRequired,
		dictionary_hidden: PropTypes.object.isRequired,
		addGroupSaga: PropTypes.func.isRequired,
		onHideElements: PropTypes.func.isRequired,
		onHide: PropTypes.func.isRequired
	}

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
		if (this.props.dictionary_elements_show)
			document.getElementById('hideElements').checked = true;
		if (this.props.dictionary_hidden.english) 
			document.getElementById('hideEnglish').checked = true;
		if (this.props.dictionary_hidden.german) 
			document.getElementById('hideGerman').checked = true;
		if (this.props.dictionary_hidden.russian) 
			document.getElementById('hideRussian').checked = true;
	}

	closeSettingsWindow = () => { this.props.onClose(false); }
	messageClose = () => { this.setState({message: ''}); }

	showGroups = () => { this.setState({ showEditWindow: !this.state.showEditWindow }); }
	addGroupWindow = () => { this.setState({ showAddGroupWindow: !this.state.showAddGroupWindow }); }

	changeUrl = (e) => { this.setState({ url: e.target.value }); }
	changeUrlFrom = (e) => { this.setState({ url_from: e.target.value }); }
	setGroupName = (e) => { this.setState({ groupName: e.target.value }); }

	hideEnglish = () => { this.props.onHide("english"); }
	hideGerman = () => { this.props.onHide("german"); }
	hideRussian = () => { this.props.onHide("russian"); }

	hideElements = () => {
		this.props.onHideElements(document.getElementById('hideElements').checked);
	}

	chooseGroup = (e) => {
		const value = e.target.value;
		const elem = this.props.dictionary_groups.filter((group) => 
			group.name === value
		)[0];
		this.setState({ selectedGroup: elem })
	}

	addGroup = () => {
		this.props.addGroupSaga({ name: this.state.groupName });
		this.setState({message: <div className="message_success" onClick={this.messageClose}>Группа добавлена</div> })
		this.addGroupWindow();
		setTimeout(() => { this.setState({message: ''}) }, 15000);
		//this.setState({message: <div className="message_success" onClick={this.messageClose}>{response.data.success}</div> })
		//this.setState({message: <div className="message_error" onClick={this.messageClose}>{response.data.error}</div> })
	}

	load = () => {
		const data = JSON.stringify(this.props.dictionary_notes);
		axios.post('/api/words/loadWords', {url: this.state.url})
		.then(response => {
			this.setState({message: <div className="message_success" onClick={this.messageClose}>{response.data}</div> })
		})
		.catch(error => console.log(error));

		setTimeout(() => { this.setState({message: ''}) }, 15000);
	}


	getFile = () => {
		this.fileName = document.getElementById('loadFile').files[0].name;
	}

	getDeleteMessage = (value) => {
		this.setState({ message: value });
		this.setState({ selectedGroup: "" });
	}

	

	render(){
		return (
			<div className="setting-window col-xs-10 col-xs-offset-1">

				<div className="setting-window__header">Settings<i className="fas fa-times" onClick={this.closeSettingsWindow}></i></div>
				
				<div className="setting-window__message">
					{this.state.message}
				</div>
				
				<div className="setting-window__body col-xs-12">
					
					<div className="setting-window__checkbox">
						<label htmlFor="hideElements">Hide controls</label>
						<input id="hideElements" type="checkbox" onChange={this.hideElements} />
					</div>

					<div className="setting-window__block">
						<div className="block-upload">
							<span className="col-sm-3 col-xs-12">Unload wordbase</span>
							<input className="col-sm-8 col-xs-10" type="text" placeholder="Where to" value={this.state.url} onChange={this.changeUrl} />
							<div onClick={this.load}><i className="fas fa-download col-xs-1"></i></div>
						</div>
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideEnglish">Hide english words</label>
						<input id="hideEnglish" type="checkbox" onChange={this.hideEnglish} />
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideGerman">Hide german words</label>
						<input id="hideGerman" type="checkbox" onChange={this.hideGerman} />
					</div>

					<div className="setting-window__checkbox col-xs-12 col-sm-5">
						<label htmlFor="hideRussian">Hide russian words</label>
						<input id="hideRussian" type="checkbox" onChange={this.hideRussian} />
					</div>

					<div className="setting-window__block">
						<div className="block-clever">
							<div className="block-clever__control col-xs-12">
								{!this.state.showEditWindow ?
									<div className="custom-btn btn__setting col-xs-12 col-sm-3" onClick={this.showGroups}>Edit groups</div>
								:
									<div className="custom-btn btn__setting btn__setting_close col-xs-12 col-sm-3" onClick={this.showGroups}><i className="fas fa-times"></i></div>
								}

								{this.state.showEditWindow ?
								<div className="setting-edit-window">
									<div className="col-xs-12 setting-edit-window__select">
										<span className="col-xs-3 setting-edit-window__label">Group</span>
										<div className="col-xs-7">
											<select className="form-control setting-edit-window__selector" id="group_selector" defaultValue={this.state.selectedGroup} onChange={this.chooseGroup}>
												<option disabled value="">Choose group</option>
												{this.props.dictionary_groups.map((group, index) => 
													<option key={"group"+index} value={group.name}>{group.name}</option>
												)}
											</select>
										</div>
										{!this.state.showAddGroupWindow ?
											<div className="col-xs-1 btn-custom btn__dict btn__dict_add btn__dict_groups" onClick={this.addGroupWindow}>
												<i className="fas fa-plus"></i>
											</div>
										:
											<div className="col-xs-1 btn-custom btn__dict btn__dict_close btn__dict_groups" onClick={this.addGroupWindow}>
												<i className="fas fa-times"></i>
											</div>
										}
									</div>

									{this.state.showAddGroupWindow ?
						
											<div className="setting-edit-window__block col-xs-12">
												<span className="edit-window-block__header col-xs-12">Add group</span>
												<input type="text" placeholder="Название" className="col-xs-10 col-xs-offset-1" onChange={this.setGroupName} />
												<i className="fas fa-check col-md-1 col-xs-12" onClick={this.addGroup}></i>
											</div>
								
									: null}


									{this.state.selectedGroup !== '' ?
										<GroupLineComponent 
											group={this.state.selectedGroup}
											deleteMessage={this.getDeleteMessage}
										/>
									: null }

								</div>

								: null }

								<div className="custom-btn btn__setting col-xs-12 col-sm-3">Sort</div>
							</div>

							

						</div>
					</div>

				</div>
			</div>
		)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsComponent);