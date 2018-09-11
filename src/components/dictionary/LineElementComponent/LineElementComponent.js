import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateNoteSaga } from '../../../redux/actions/dictionary/dictionary-notes-actions';

import { selectDictionaryHidden } from '../../../redux/selectors/dictionary-selectors';

function mapStateToProps(state) {
	return {
		dictionary_hidden: selectDictionaryHidden(state)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateNoteSaga: updateNoteSaga
	}, dispatch)
}

class LineElementComponent extends Component {
	static propTypes = {
		language: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		note: PropTypes.object.isRequired,
		edit: PropTypes.bool.isRequired,
		dictionary_hidden: PropTypes.object.isRequired
	}

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
		this.setState({ hide: this.props.dictionary_hidden[this.props.language] });
	}

	componentWillReceiveProps(nextProps){
		if (this.props.dictionary_hidden !== nextProps.dictionary_hidden)
			this.setState({ hide: nextProps.dictionary_hidden[this.props.language] });

		if (this.props.edit !== nextProps.edit) 
			this.setState({ edit: nextProps.edit });
	}

	editElement = () => { this.setState({ edit: true }) };

	changeText = (e) => {
		this.setState({ text: e.target.value })
	}

	submitChanges = () => {
		const data = {
			note: this.props.note,
			change: this.props.language,
			value: this.state.text
		};

		this.props.updateNoteSaga(data);
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
	mapStateToProps,
	mapDispatchToProps
)(LineElementComponent);
