import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../css/line_setting.scss';

class LineSettingComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			importance: this.props.important
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.importance !== nextState.importance || this.props.important !== nextProps.important;
	}

	importanceCheck = () => {
		this.setState({ importance: !this.state.importance });
		this.props.onNoteUpdate({id: this.props.db_id, important: !this.state.importance });

		this.props.onSetImportance(!this.state.importance);

		axios.post('/api/words/edit/'+this.props.db_id, {important: !this.state.importance})
		.catch(error => console.log('error'));	
	}

	close = () => {
		this.props.onClose(false);
	}

	render(){
		return (
			<div className="line-setting-component">
				<div className="line-setting-component__header">Дополнительные настройки <i className="fas fa-times" onClick={this.close}></i></div>
				<div className="line-setting-component__body">
					{!this.state.importance ? 
						<div className="line__btn line__btn_unimportant" onClick={this.importanceCheck}>
							Пометить, как важное
						</div>
					: 
						<div className="line__btn line__btn_important" onClick={this.importanceCheck}>
							Пометить, как неважное
						</div>
					}
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