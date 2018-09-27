import { DICT_GROUPS_TYPES } from '../../actions/dictionary/dictionary-groups-actions';

export default function dictionary_groups(state = [], action) {
	switch (action.type) {
		case DICT_GROUPS_TYPES.FETCH_GROUPS_SUCCESS:
			return action.payload;
		case DICT_GROUPS_TYPES.FETCH_GROUPS_ERROR:
			console.log('ERROR FETCHING GROUPS: ' + action.payload); 
			return state;
		case DICT_GROUPS_TYPES.ADD_GROUP_SUCCESS: 
			console.log(action.payload);
			return [...state, action.payload];
		case DICT_GROUPS_TYPES.ADD_GROUP_ERROR:
			console.log("ERROR ADDING GROUP: " + action.payload);
			return state;
		case 'UPDATE_GROUP':
			const id = action.payload._id;
			let new_state = state;
			new_state.forEach((group, index) => {
				if (group._id === id) new_state.splice(index, 1, action.payload);
			})
			return new_state;
		case 'DELETE_WORD_FROM_GROUP':
			let group_id = null;
			if (action.group === undefined) group_id = action.group_id;
			else group_id = action.group._id;
			const word_id = action.word_id;
			let del_state = state;
			
			del_state.forEach((group, index) => {
				if (group._id === group_id) {
					del_state[index].words.forEach((word, index2) => {
						if (word === word_id) del_state[index].words.splice(index2, 1);
					})
				}
			})
			return del_state;
		case 'REMOVE_GROUP':
			const reduced_group_array = state.filter((item) => item._id !== action.payload)
			return reduced_group_array;
		default: 
			return state;
	}
}