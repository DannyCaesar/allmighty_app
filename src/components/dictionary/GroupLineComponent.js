import React, { Component } from 'react';

class GroupLineComponent extends Component {
	render(){
		return (
			<div className="group-line">
				<div className="group-line__header col-xs-11 col-xs-offset-1">
					<div className="col-xs-4">Дата</div>
					<div className="col-xs-4">Название</div>
					<div className="col-xs-4">Записей</div>
				</div>

				<div className="group-line__body col-xs-12">
					<div className="col-xs-1">E</div>
					<div className="col-xs-11">
						<div className="col-xs-4">{this.props.adddate}</div>
						<div className="col-xs-4">{this.props.name}</div>
						<div className="col-xs-4">{this.props.words.length}</div>
					</div>
				</div> 
				
				<div>
					Удалить группу
				</div>

			</div>
		)
	}
}

export default GroupLineComponent;