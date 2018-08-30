export const DICT_NOTES_TYPES = {
	FETCH_NOTES_SAGA: 'FETCH_NOTES_SAGA',
	FETCH_NOTES_SUCCESS: 'FETCH_NOTES_SUCCESS',
	FETCH_NOTES_ERROR: 'FETCH_NOTES_ERROR',

	ADD_NOTE: 'ADD_NOTE',
	UPDATE_NOTE: 'UPDATE_NOTE',
	REMOVE_NOTE: 'REMOVE_NOTE',
	UPDATE_NOTE_FORMS: 'UPDATE_NOTE_FORMS',
	ADD_NOTE_FORM: 'ADD_NOTE_FORM'
}


export function fetchNotesSaga(){
	return {
		type: DICT_NOTES_TYPES.FETCH_NOTES_SAGA
	}
}

export function fetchNotesSuccess(notes) {
	return {
		type: DICT_NOTES_TYPES.FETCH_NOTES_SUCCESS,
		payload: notes
	}
}

export function fetchNotesError(error) {
	return {
		type: DICT_NOTES_TYPES.FETCH_NOTES_ERROR,
		payload: error
	}
}



export function onAddNote(note) {
	return { 
		type: DICT_NOTES_TYPES.ADD_NOTE, 
		payload: note 
	}
}

export function onNoteUpdate(note){
	return {
		type: DICT_NOTES_TYPES.UPDATE_NOTE, 
		payload: note
	}
}

export function onRemoveNote(note){
	return {
		type: DICT_NOTES_TYPES.REMOVE_NOTE, 
		payload: note
	} 
}

export function onNoteFormUpdate(word_id, form_id) {
	return { 
		type: DICT_NOTES_TYPES.UPDATE_NOTE_FORMS, 
		word_id: word_id, 
		form_id: form_id 
	}
}

export function onAddNoteForm(word_id, form) {
	return { 
		type: DICT_NOTES_TYPES.ADD_NOTE_FORM, 
		word_id: word_id, 
		form: form 
	}
}

