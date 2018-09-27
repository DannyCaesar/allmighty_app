import { all } from 'redux-saga/effects';
import { watchFetchNotes, watchAddNote, watchUpdateNotes, watchRemoveNote } from './dictionary/dictionary-notes-sagas';
import { watchFetchGroups, watchAddGroup } from './dictionary/dictionary-groups-sagas';


export default function* rootSaga(){
	yield all([
		//Notes
		watchFetchNotes(),
		watchAddNote(),
		watchUpdateNotes(),
		watchRemoveNote(),
		//Groups
		watchFetchGroups(),
		watchAddGroup()
	]);
}