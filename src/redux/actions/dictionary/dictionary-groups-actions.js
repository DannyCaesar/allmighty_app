export const DICT_GROUPS_TYPES = {
	ADD_GROUP: 'ADD_GROUP',
	UPDATE_GROUP: 'UPDATE_GROUP',
	REMOVE_GROUP: 'REMOVE_GROUP',
	DELETE_WORD_FROM_GROUP: 'DELETE_WORD_FROM_GROUP'
}

export function onAddGroup(group) {
	return { 
		type: DICT_GROUPS_TYPES.ADD_GROUP, 
		payload: group 
	}
}

export function onUpdateGroup(group) {
	return { 
		type: DICT_GROUPS_TYPES.UPDATE_GROUP, 
		payload: group 
	}
}

export function onRemoveGroup(id) {
	return { 
		type: DICT_GROUPS_TYPES.REMOVE_GROUP, 
		payload: id
	}
}

export function onDeleteWordFromGroup(group_id, word_id) {
	return { 
		type: DICT_GROUPS_TYPES.DELETE_WORD_FROM_GROUP, 
		group_id: group_id, 
		word_id: word_id 
	}
}