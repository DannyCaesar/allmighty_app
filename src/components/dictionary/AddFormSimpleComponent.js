import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../css/addFormSimpleComponent.scss';

class AddFormSimpleComponent extends Component {

	constructor(){
		super();
		this.state = {
			english: '',
			german: '',
			russian: '',
			comment: '',
			submitted: false,
			id: null
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.state.english !== nextState.english || this.state.german !== nextState.german || this.state.russian !== nextState.russian)
			return false;
		else 
			return true;	
	}

	setEnglish = (e) => { this.setState({ english: e.target.value }) }
	setGerman = (e) => { this.setState({ german: e.target.value }) }
	setRussian = (e) => { this.setState({ russian: e.target.value }) }
	setComment = (e) => { this.setState({ comment: e.target.value }) }

	submit = () => {
		const data = {
			status: 'add',
			id: Date.now(),
			word: {
				id: Date.now(),
				english: this.state.english,
				german: this.state.german,
				russian: this.state.russian,
				comment: this.state.comment
			}
		}
		this.setState({ id: Date.now() });

		if (this.props.lineSetting !== true)
			this.props.wordForm(data);
		else {
			this.props.newForm(data);
			//this.props.onAddNoteForm(data.word);
		}
	}

	remove = () => {
		const data = {
			status: 'remove',
			id: this.state.id
		}
		this.setState({ id: null })
		this.props.wordForm(data);
	}

	renderSubmitted = () => {
		return (
			<div className="form-line col-xs-12">

				<div className="col-xs-1 form-line__btn form-line__btn_error">
					<i className="fas fa-minus" onClick={this.remove} data-toggle="tooltip" title="Удалить форму"></i>
				</div>

				<div className="col-xs-10 form-line__block">
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="English word" onChange={this.setEnglish} disabled />
					</div>
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="Deutsches Wort" onChange={this.setGerman} disabled />
					</div>
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="Русское слово" onChange={this.setRussian} disabled />
					</div>

					<div className="col-xs-12 form-line__textarea">
						<textarea className="form-control col-xs-10" placeholder="Комментарий к форме слова" value={this.state.comment} disabled></textarea>
					</div>
				</div>
					
			</div>
		)
	}

	renderUnSumbitted = () => {
		return (
			<div className="form-line col-xs-12">
				<div className="col-xs-1 form-line__btn form-line__btn_error">
					<i className="fas fa-minus" onClick={this.remove} data-toggle="tooltip" title="Удалить форму"></i>
				</div>

				<div className="col-xs-9 form-line__block">
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="English word" onChange={this.setEnglish}/>
					</div>
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="Deutsches Wort" onChange={this.setGerman} />
					</div>
					<div className="col-xs-12 col-sm-4">
						<input type="text" placeholder="Русское слово" onChange={this.setRussian} />
					</div>

					<div className="col-xs-12 form-line__textarea">
						<textarea className="form-control col-xs-10" placeholder="Комментарий к форме слова" value={this.state.comment} onChange={this.setComment}></textarea>
					</div>
				</div>
	

				<div className="col-xs-1 form-line__btn form-line__btn_success">
					<i className="fas fa-check" onClick={this.submit}></i>
				</div>
			</div>
		)
	}

	render(){
		if (this.state.id !== null) return this.renderSubmitted();
		else return this.renderUnSumbitted();
	}
}

export default connect(
	state => ({
		store: state
	})
)(AddFormSimpleComponent);