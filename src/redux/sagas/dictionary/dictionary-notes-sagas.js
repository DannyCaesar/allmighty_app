import { put, takeEvery, select, call } from 'redux-saga/effects';
import { 
	DICT_NOTES_TYPES, 
	addNoteSuccess, addNoteError,
	fetchNotesSuccess, fetchNotesError, 
	updateNoteSuccess, updateNoteError, 
	removeNoteSuccess, removeNoteError
} from '../../actions/dictionary/dictionary-notes-actions';
import { DICT_GROUP_TYPES, fetchGroupsSaga } from '../../actions/dictionary/dictionary-groups-actions';
import axios from 'axios';


// Fetch notes
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


// Add note
function* addNote(action) {
	const url = "/api/words";
	try {
		const result = yield axios.post(url, action.payload ); //get { word_id: '', group_id: '' }
		const in_data = result.data;
		const in_method = "GET";
		const note_url = `/api/words/${in_data.word_id}`;
		const group_url = `/api/groups/${in_data.group_id}`;

		const result2 = yield axios.get(note_url);
		yield put(addNoteSuccess(result2.data));
	} catch (error) {
		yield put(addNoteError(error));
	}
}

export function* watchAddNote() {
	yield takeEvery(DICT_NOTES_TYPES.ADD_NOTE_SAGA, addNote);
}


// Update note
function* updateNote(action){
	const url = "/api/words/edit/"+action.payload.note._id;
	try {
		yield put(updateNoteSuccess(action.payload));
		const result = yield axios.post(url, action.payload);
	} catch (error) {
		yield put(updateNoteError(error));
	}
}

export function* watchUpdateNotes(){
	yield takeEvery(DICT_NOTES_TYPES.UPDATE_NOTE_SAGA, updateNote);
}


// Remove note
function* removeNote(action){
	const method = "DELETE";
	const url = '/api/words/' + action.payload._id;
	try {
		yield put(removeNoteSuccess(action.payload));
		yield call(axios, { method, url });
	} catch (error) {
		yield put(removeNoteError(error));
	}
}

export function* watchRemoveNote(){
	yield takeEvery(DICT_NOTES_TYPES.REMOVE_NOTE_SAGA, removeNote);
}