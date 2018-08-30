import { put, takeEvery, select, call } from 'redux-saga/effects';
import { DICT_NOTES_TYPES, fetchNotesSuccess, fetchNotesError, updateNoteSuccess, updateNoteError } from '../../actions/dictionary/dictionary-notes-actions';
import axios from 'axios';

function* fetchNotes(){
	const method = "GET";
	const url = "/api/words";
	try {
		const result = yield call(axios, { method, url });
		const data = result.data;
		yield put(fetchNotesSuccess(data));
	} catch (error) {
		yield put(fetchNotesError(error));
	}
}

export function* watchFetchNotes(){
	yield takeEvery(DICT_NOTES_TYPES.FETCH_NOTES_SAGA, fetchNotes);
}


function* updateNote(action){
	const method = "POST";
	const url = "/api/words/edit/"+action.payload._id;
	try {
		yield put(updateNoteSuccess(action.payload));
		const result = yield call(axios, { method, url}, { important: action.payload.important });
	} catch (error) {
		yield put(updateNoteError(error));
	}
}

export function* watchUpdateNotes(){
	yield takeEvery(DICT_NOTES_TYPES.UPDATE_NOTE_SAGA, updateNote);
}

