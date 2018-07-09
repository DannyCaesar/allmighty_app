import React, { Component } from 'react';

import '../../css/groupLineComponent.scss';

class GroupLineComponent extends Component {
	render(){
		return (
			<div className="group-line">
				<div className="group-line__header col-xs-11 col-xs-offset-1">
					<div className="col-xs-4 group-line__header_elem">Название</div>
					<div className="col-xs-4 group-line__header_elem">Дата</div>
					<div className="col-xs-4 group-line__header_elem">Записей</div>
				</div>

				<div className="group-line__body col-xs-12">
					<div className="custom-btn group-line__btn group-line__btn_edit col-xs-1" data-toggle="tooltip" title="Изменить группу"><i className="fas fa-pen"></i></div>
					<div className="col-xs-11">
						<div className="col-xs-4">{this.props.name}</div>
						<div className="col-xs-4">{this.props.adddate}</div>
						<div className="col-xs-4">{this.props.words.length}</div>
					</div>
				</div> 
				
				<div className="custom-btn group-line__btn group-line__btn_delete">
					<i className="fas fa-trash-alt" data-toggle="tooltip" title="Удалить группу"></i>
				</div>

			</div>
		)
	}
}

export default GroupLineComponent;