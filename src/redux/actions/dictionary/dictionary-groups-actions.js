export const DICT_GROUPS_TYPES = {
	FETCH_GROUPS_SAGA: 'FETCH_GROUPS_SAGA',
	FETCH_GROUPS_SUCCESS: 'FETCH_GROUPS_SUCCESS',
	FETCH_GROUPS_ERROR: 'FETCH_GROUPS_ERROR',

	ADD_GROUP_SAGA: 'ADD_GROUP_SAGA',
	ADD_GROUP_SUCCESS: 'ADD_GROUP_SUCCESS',
	ADD_GROUP_ERROR: 'ADD_GROUP_ERROR',

	UPDATE_GROUP: 'UPDATE_GROUP',
	REMOVE_GROUP: 'REMOVE_GROUP',
	DELETE_WORD_FROM_GROUP: 'DELETE_WORD_FROM_GROUP'
}

// Fetch groups
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

// Add one group
export function addGroupSaga(group) {
	return { 
		type: DICT_GROUPS_TYPES.ADD_GROUP_SAGA, 
		payload: group 
	}
}

export function addGroupSuccess(group) {
	return {
		type: DICT_GROUPS_TYPES.ADD_GROUP_SUCCESS,
		payload: group
	}
}

export function addGroupError(error) {
	return {
		type: DICT_GROUPS_TYPES.ADD_GROUP_ERROR,
		payload: error
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