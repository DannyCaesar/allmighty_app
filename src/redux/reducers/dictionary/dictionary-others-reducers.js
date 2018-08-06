export function dictionary_hidden(state = { english: false, german: false, russian: false }, action) {
	switch (action.type) {
		case "HIDE_COLUMN":
			let new_state = state; 
			if (action.payload === "english") new_state.english = !new_state.english;
			if (action.payload === "german") new_state.german = !new_state.german;
			if (action.payload === "russian") new_state.russian = !new_state.russian;
			return Object.create(new_state);
		default: 
			return state;
	}
}

export function dictionary_elements_show(state = false, action){
	switch (action.type) {
		case 'HIDE_ELEMENTS':
			return action.payload;
		default:
			return state;
	}
}
