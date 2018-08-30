export const DICT_GROUPS_TYPES = {
	FETCH_GROUPS_SAGA: 'FETCH_GROUPS_SAGA',
	FETCH_GROUPS_SUCCESS: 'FETCH_GROUPS_SUCCESS',
	FETCH_GROUPS_ERROR: 'FETCH_GROUPS_ERROR',

	ADD_GROUP: 'ADD_GROUP',
	UPDATE_GROUP: 'UPDATE_GROUP',
	REMOVE_GROUP: 'REMOVE_GROUP',
	DELETE_WORD_FROM_GROUP: 'DELETE_WORD_FROM_GROUP'
}

export function fetchGroupsSaga(){
	return {
		type: DICT_GROUPS_TYPES.FETCH_GROUPS_SAGA
	}
}

export function fetchGroupsSuccess(groups) {
	return {
		type: DICT_GROUPS_TYPES.FETCH_GROUPS_SUCCESS,
		payload: groups
	}
}

export function fetchGroupsError(error) {
	return {
		type: DICT_GROUPS_TYPES.FETCH_GROUPS_ERROR,
		payload: error
	}
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