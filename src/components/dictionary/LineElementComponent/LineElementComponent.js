import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LineElementComponent extends Component {

	constructor(){
		super();
		this.state = {
			edit: false,
			text: '',
			hide: false
		}
	}

	componentDidMount(){
		this.setState({ text: this.props.value });
		this.setState({ hide: this.props.store.dictionary_hidden[this.props.language] });
	}

	componentWillReceiveProps(nextProps){
		if (this.props.store.dictionary_hidden !== nextProps.store.dictionary_hidden)
			this.setState({ hide: nextProps.store.dictionary_hidden[this.props.language] });
	}

	editElement = () => { this.setState({ edit: true }) };

	changeText = (e) => {
		this.setState({ text: e.target.value })
	}

	submitChanges = () => {
		/*const data = {
			english: this.props.note.english,
			german: this.props.note.german,
			russian: this.props.note.russian
		}*/

		//axios.post('/api/words/edit/'+this.props.note._id, data)
		//.catch(error => console.log(error));


		this.setState({ edit: false });
	}

	keySubmitChanges = (e) => { 
		if (e.keyCode === 13 || e.keyCode === 27) 
			this.submitChanges(); 
	}

	showElement = () => {
		this.setState({ hide: false })
	}

	render(){
		if (!this.state.hide)
			return (
				<div>
					{!this.state.edit ?
						<div className="col-xs-4 col-md-4 line__block" onDoubleClick={this.editElement}>{this.state.text}</div>	
					:
						<div className="line__item col-xs-4">
							<div className="col-xs-11"><input type="text" placeholder={this.props.language} value={this.state.text} onChange={this.changeText} onKeyDown={this.keySubmitChanges} /></div>
							<div className="col-xs-1 btn_check" onClick={this.submitChanges}><i className="fas fa-check"></i></div>
						</div>
					}
				</div>
			)
		else 
			return (
				<div className="col-xs-4 col-md-4 line__block line__block_hidden" onClick={this.showElement}>{this.state.text}</div>
			)
	}
}

export default connect(
	state => ({
		store: state
	})
)(LineElementComponent);
