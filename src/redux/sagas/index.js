import { all } from 'redux-saga/effects';
import { watchFetchNotes, watchUpdateNotes } from './dictionary/dictionary-notes-sagas';
import { watchFetchGroups } from './dictionary/dictionary-groups-sagas';


export default function* rootSaga(){
	yield all([
		watchFetchNotes(),
		watchFetchGroups(),
		watchUpdateNotes()
	]);
}