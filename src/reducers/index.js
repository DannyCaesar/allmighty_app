import { combineReducers } from 'redux';

import { dictionary_notes, dictionary_elements_show, dictionary_groups, dictionary_hidden } from './dictionary';

export default combineReducers({
	dictionary_notes,
	dictionary_groups,
	dictionary_elements_show,
	dictionary_hidden
})