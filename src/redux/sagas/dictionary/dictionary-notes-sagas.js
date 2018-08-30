import { put, takeEvery, select, call } from 'redux-saga/effects';
import { DICT_NOTES_TYPES, fetchNotesSuccess, fetchNotesError } from '../../actions/dictionary/dictionary-notes-actions';
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