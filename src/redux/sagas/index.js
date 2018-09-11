import { all } from 'redux-saga/effects';
import { watchFetchNotes, watchAddNote, watchUpdateNotes, watchRemoveNote } from './dictionary/dictionary-notes-sagas';
import { watchFetchGroups } from './dictionary/dictionary-groups-sagas';


export default function* rootSaga(){
	yield all([
		watchFetchNotes(),
		watchAddNote(),
		watchUpdateNotes(),
		watchRemoveNote(),
		watchFetchGroups()
	]);
}