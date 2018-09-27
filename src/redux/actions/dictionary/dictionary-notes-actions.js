export const DICT_NOTES_TYPES = {
	FETCH_NOTES_SAGA: 'FETCH_NOTES_SAGA',
	FETCH_NOTES_SUCCESS: 'FETCH_NOTES_SUCCESS',
	FETCH_NOTES_ERROR: 'FETCH_NOTES_ERROR',

	ADD_NOTE_SAGA: 'ADD_NOTE_SAGA',
	ADD_NOTE_SUCCESS: 'ADD_NOTE_SUCCESS',
	ADD_NOTE_ERROR: 'ADD_NOTE_ERROR',

	UPDATE_NOTE_SAGA: 'UPDATE_NOTE_SAGA',
	UPDATE_NOTE_SUCCESS: 'UPDATE_NOTE_SUCCESS',
	UPDATE_NOTE_ERROR: 'UPDATE_NOTE_ERROR',

	REMOVE_NOTE_SAGA: 'REMOVE_NOTE_SAGA',
	REMOVE_NOTE_SUCCESS: 'REMOVE_NOTE_SUCCESS',
	REMOVE_NOTE_ERROR: 'REMOVE_NOTE_ERROR',

	UPDATE_NOTE_FORMS: 'UPDATE_NOTE_FORMS',
	ADD_NOTE_FORM: 'ADD_NOTE_FORM'
}


// Fetch notes
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

// Add one note
export function addNoteSaga(note) {
	return { 
		type: DICT_NOTES_TYPES.ADD_NOTE_SAGA, 
		payload: note 
	}
}

export function addNoteSuccess(note) {
	return {
		type: DICT_NOTES_TYPES.ADD_NOTE_SUCCESS,
		payload: note
	}
}

export function addNoteError(error) {
	return {
		type: DICT_NOTES_TYPES.ADD_NOTE_ERROR,
		payload: error
	}
}

// Update one note
export function updateNoteSaga(note) {
	return {
		type: DICT_NOTES_TYPES.UPDATE_NOTE_SAGA,
		payload: note
	}
}

export function updateNoteSuccess(note) {
	return {
		type: DICT_NOTES_TYPES.UPDATE_NOTE_SUCCESS,
		payload: note
	}
}

export function updateNoteError(error) {
	return {
		type: DICT_NOTES_TYPES.UPDATE_NOTE_ERROR,
		payload: error
	}
}


// Remove one note
export function removeNoteSaga(note){
	return {
		type: DICT_NOTES_TYPES.REMOVE_NOTE_SAGA, 
		payload: note
	} 
}

export function removeNoteSuccess(note){
	return {
		type: DICT_NOTES_TYPES.REMOVE_NOTE_SUCCESS,
		payload: note
	}
}

export function removeNoteError(error){
	return {
		type: DICT_NOTES_TYPES.REMOVE_NOTE_ERROR,
		payload: error
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

