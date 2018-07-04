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
			//let removedState = [...state];
			const removedState = state.filter((note, index) => 
				note.english !== action.payload.english&&note.german !== action.payload.german&&note.russian !== action.payload.russian
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
