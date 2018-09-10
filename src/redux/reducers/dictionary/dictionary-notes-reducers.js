import { DICT_NOTES_TYPES } from '../../actions/dictionary/dictionary-notes-actions';

export default function dictionary_notes(state = [], action) {
	switch (action.type) {
		case DICT_NOTES_TYPES.FETCH_NOTES_SUCCESS:
			return action.payload;
		case DICT_NOTES_TYPES.FETCH_NOTES_ERROR:
			console.log('ERROR FETCHING NOTES: ' + action.payload); 
			return state;
		
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

		case DICT_NOTES_TYPES.UPDATE_NOTE_SUCCESS:
			/* payload in the following structure:
				{
					change //which is changed field
					value //new value
					note //note which will be changed
				}
			*/
			let changed_state_result = state;
			const changed_field = action.payload.change;
			const changed_note = action.payload.note;
			const changed_value = action.payload.value;
			const changed_state = state.filter((note) => note._id === changed_note._id)[0];
			changed_state[changed_field] = changed_value; 
			changed_state_result.forEach((item, index) => {
				if (item._id === changed_state._id)
					changed_state_result.splice(index,1,changed_state);
			})
			return [...changed_state_result];
		case DICT_NOTES_TYPES.UPDATE_NOTE_ERROR:
			console.log('ERROR UPDATING NOTE: ' + action.payload); 
			return state;


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