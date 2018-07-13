import React, { Component } from 'react';

class AddFormSimpleComponent extends Component {

	constructor(){
		super();
		this.state = {
			english: '',
			german: '',
			russian: ''
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

	render(){
		return (
			<div>
				<div className="col-xs-12 col-sm-4 add-note-window__block">
					<input type="text" placeholder="English word" onChange={this.setEnglish}/>
				</div>
				<div className="col-xs-12 col-sm-4 add-note-window__block">
					<input type="text" placeholder="Deutsches Wort" onChange={this.setGerman} />
				</div>
				<div className="col-xs-12 col-sm-4 add-note-window__block">
					<input type="text" placeholder="Русское слово" onChange={this.setRussian} />
				</div>		
			</div>
		)
	}
}

export default AddFormSimpleComponent;