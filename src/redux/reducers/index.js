import { combineReducers } from 'redux';

//import { dictionary_notes, dictionary_elements_show, dictionary_groups, dictionary_hidden } from './dictionary';
import dictionary_notes from './dictionary/dictionary-notes-reducers';
import dictionary_groups from './dictionary/dictionary-groups-reducers';
import { dictionary_elements_show, dictionary_hidden } from './dictionary/dictionary-others-reducers';

export default combineReducers({
	dictionary_notes,
	dictionary_groups,
	dictionary_hidden,
	dictionary_elements_show
})