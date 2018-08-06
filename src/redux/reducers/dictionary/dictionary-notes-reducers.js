
export default function dictionary_notes(state = [], action) {
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