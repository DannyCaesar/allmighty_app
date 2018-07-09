const sampleData = {
	id: "0",
	english: "cat",
	german: "die Katze",
	russian: "кошка"
}

export function dictionary_notes(state = [], action) {
	switch (action.type) {
		case 'ADD_NOTE':
			let ids = [];
			state.forEach((item) => ids.push(item._id));
			if (!ids.includes(action.payload._id))
				return [...state, action.payload];
			else 
				return state;
		case 'REMOVE_NOTE': 
			const removedState = state.filter((note, index) => 
				note._id !== action.payload
			)
			return removedState;
		case 'UPDATE_NOTE':
			let important_state = state;
			let important_note = state.filter((note) => 
				note._id === action.payload.id
			)[0];
			important_note.important = action.payload.important;

			important_state.forEach((note, index) => {
				if (note._id === action.payload.id) important_state.splice(index,1,important_note);
			})
			return important_state;
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

export function dictionary_groups(state = [], action) {
	switch (action.type) {
		case 'ADD_GROUP': 
			return [...state, action.payload];
		default: 
			return state;
	}
}