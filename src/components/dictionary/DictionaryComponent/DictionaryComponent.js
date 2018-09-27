import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Logo from '../../general/Logo/Logo';
import LineComponent from '../LineComponent/LineComponent';
import SettingsComponent from '../SettingsComponent/SettingsComponent';
import AddWordComponent from '../AddWordComponent/AddWordComponent';

import { fetchNotesSaga } from '../../../redux/actions/dictionary/dictionary-notes-actions';
import { onAddGroup, fetchGroupsSaga } from '../../../redux/actions/dictionary/dictionary-groups-actions';

import { selectDictionaryNotes } from '../../../redux/selectors/dictionary-selectors';

import './dictionary-styles.scss';

function mapStateToProps(state) {
	return {
		dictionary_notes: selectDictionaryNotes(state)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchNotesSaga: fetchNotesSaga,
		fetchGroupsSaga: fetchGroupsSaga
	}, dispatch);
}

class DictionaryComponent extends Component {
	static propTypes = {
		dictionary_notes: PropTypes.array.isRequired,
		fetchNotesSaga: PropTypes.func.isRequired,
		fetchGroupsSaga: PropTypes.func.isRequired
	}

	constructor(props){
		super(props);
		this.state = {
			showAdd: false, //display AddWordComponent
			showSettings: false, //display SettingsComponent
			showMessage: false //display message
		}
	}

	componentDidMount(){
		this.props.fetchNotesSaga(); //fetch all notes
		this.props.fetchGroupsSaga(); //fetch all groups
	}

	showAddWindow = () => {
		this.setState({ showAdd: !this.state.showAdd })
	}

	closeAddWindow = (value) => {
		this.setState({ showAdd: false })

		if (value === "added") {
			this.setState({ showMessage: true });
			setTimeout(() => this.setState({ showMessage: false}), 2000);
		}
	}

	showSettingsWindow = () => {
		this.setState({ showSettings: !this.state.showSettings })
	}	

	closeSettingsWindow = (value) => {
		this.setState({ showSettings: value })
	}

	render(){
		
		return (
			<div className="col-xs-12">
				<div className="component">
				<Logo link="/home" />

				<div className="dict__button-group">
					{!this.state.showAdd ? 
						<div className="custom-btn dict__btn dict__btn_add" onClick={this.showAddWindow}><i className="fas fa-plus"></i></div>
					: 
						<div className="custom-btn dict__btn dict__btn_close" onClick={this.showAddWindow}><i className="fas fa-times"></i></div>
					}

					{!this.state.showSettings ? 
						<div className="custom-btn dict__btn dict__btn_settings" onClick={this.showSettingsWindow}><i className="fas fa-ellipsis-h"></i></div>
					: 
						<div className="custom-btn dict__btn dict__btn_close" onClick={this.showSettingsWindow}><i className="fas fa-times"></i></div>
					}	
				</div>


				{this.state.showMessage ?
					<div className="dict__message col-xs-12">
						<i className="fa fa-check-circle"></i>
					</div>
				: null }

				{this.state.showAdd ?
					<AddWordComponent 
						close={this.closeAddWindow}
					/>
				: null }

				{this.state.showSettings ?
					<SettingsComponent 
						onClose={this.closeSettingsWindow}
					/>
				: null }

				<div className="col-xs-10 col-xs-offset-1">
					<div className="col-xs-12">
						<div className="line__header col-xs-12">
							<div className="col-xs-4 line__header_right">English</div>
							<div className="col-xs-4">Deutsch</div>
							<div className="col-xs-4 line__header_left">Русский</div>
						</div>
					</div>
				</div>
				
				{ this.props.dictionary_notes.map((note, index) => 
					<LineComponent 
						key={`line${index}`}
						id={`line${index}`}
						note={note}
					/>
				)}
				</div>

				<div className="author-footer col-xs-12">&#169; Denis Moroz, { new Date().getFullYear() }</div>
			
			</div>
		)
	}
} 

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DictionaryComponent);