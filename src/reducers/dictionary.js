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
		case 'UPDATE_NOTE_FORMS':
			let form_state = state;
			let form_note = form_state.filter((note) => 
				note._id === action.word_id
			)[0];

			form_note.forms = form_note.forms.filter((form) => 
				form.id !== parseInt(action.form_id, 10)
			)
			
			form_state.forEach((note, index) => {
				if (note._id === action.word_id) form_state.splice(index,1,form_note);
			})
			return [...form_state];
		case 'ADD_NOTE_FORM':
			let new_form_state = state;
			new_form_state.forEach((note) => {
				if (note._id === action.word_id) note.forms.push(action.form);
			})
			return [...new_form_state];
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