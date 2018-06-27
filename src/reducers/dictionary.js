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
		default:
			return state;
	}
}
