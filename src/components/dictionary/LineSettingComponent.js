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

	componentDidMount(){
		const checkbox = document.getElementById(`check${this.props.db_id}`);
		const elem = this.props.store.dictionary_notes.filter((note) => 
			note._id === this.props.db_id
		)[0];
		checkbox.checked = elem.important;
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.importance !== nextState.importance || this.props.important !== nextProps.important;
	}

	importanceCheck = () => {
		const checkbox = document.getElementById(`check${this.props.db_id}`);
		this.setState({ importance: !this.state.importance });
		checkbox.checked = !this.state.importance;

		axios.post('/api/words/edit/'+this.props.db_id, {important: !this.state.importance})
		.catch(error => console.log('error'));

		this.props.onNoteUpdate({id: this.props.db_id, important: this.state.importance });
	}

	close = () => {
		this.props.onClose(false);
	}

	render(){
		return (
			<div className="line-setting-component">
				<div className="line-setting-component__header">Дополнительные настройки <i className="fas fa-times" onClick={this.close}></i></div>
				<div className="line-setting-component__body">
					<div className="line_btn line_btn__importance" onClick={this.importanceCheck}>
						<label>Отметить, как важное</label>
						<input type="checkbox" id={`check${this.props.db_id}`}/>
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