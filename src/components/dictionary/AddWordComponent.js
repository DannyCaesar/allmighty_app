import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddFormSimpleComponent from './AddFormSimpleComponent';

import '../../css/addWordComponent.scss';

class AppWordComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			selectedGroup: '',
			formsCounter: ['form'],
		}
	}

	addForm = () => {
		this.setState({ formsCounter: this.state.formsCounter.concat(['form']) })
	}

	chooseGroup = (e) => {
		const value = e.target.value;
		const elem = this.props.store.dictionary_groups.filter((group) => 
			group.name === value
		)[0];
		this.setState({ selectedGroup: elem })
	}

	closeAddWindow = () => {
		this.props.close(false);
	}

	render(){
		return (
			<div className="add-note-window col-xs-10 col-xs-offset-1">
				<div className="add-note-window__header">Добавить запись <i className="fas fa-times" onClick={this.closeAddWindow}></i></div>
				<div className="add-note-window__body">
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="English word" id="english" />
					</div>
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="Deutsches Wort" id="german" />
					</div>
					<div className="col-xs-12 col-sm-4 add-note-window__block">
						<input type="text" placeholder="Русское слово" id="russian" />
					</div>
				

				<div className="add-note-window__optional">
					<div className="col-xs-6 col-sm-4 add-note-window__header_lesser">Дополнительно</div>
					<div className="clearfix"></div>

					<div className="col-xs-12 optional-groups">
						<span className="col-xs-4">Группа</span>
						<div className="col-xs-8">
							<select className="form-control setting-edit-window__selector" defaultValue="" onChange={this.chooseGroup}>
								<option disabled value="">Выберите группу</option>
								{this.props.store.dictionary_groups.map((group, index) => 
									<option key={"group"+index} value={group.name}>{group.name}</option>
								)}
							</select>
						</div>
					</div>

					<div className="col-xs-12 optional-forms">
						<div className="col-xs-4 optional-forms__header">
							<span onClick={this.addForm}><i className="fas fa-plus"></i> Добавить форму слова</span>
						</div>
						<div className="clearfix"></div>
						{this.state.formsCounter.map((form, index) => 
							<AddFormSimpleComponent 
								key={`form${index}`}
							/>
									
						)}
					</div>

					<div className="col-xs-12 optional-comment">
						<div className="col-xs-10 col-xs-offset-1">
							<textarea className="form-control" placeholder="Комментарий"></textarea>
						</div>
					</div>

					<div className="add-note-window__btn">
						<div className="btn btn__dict btn__dict_check" onClick={this.addNote}><i className="fas fa-check"></i></div>
					</div>

				</div>
				</div>
			</div>
		)
	}
}

export default connect (
	state => ({
		store: state
	})
)(AppWordComponent);