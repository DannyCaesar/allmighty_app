export function dictionary_notes(state = [], action) {
	switch (action.type) {
		case 'ADD_NOTE':
			return action.payload;
		default:
			return state;
	}
}
