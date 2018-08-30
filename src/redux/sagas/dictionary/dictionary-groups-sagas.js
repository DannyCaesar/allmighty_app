import { put, takeEvery, select, call } from 'redux-saga/effects';
import { DICT_GROUPS_TYPES, fetchGroupsSuccess, fetchGroupsError } from '../../actions/dictionary/dictionary-groups-actions';
import axios from 'axios';

function* fetchGroups(){
	const method = "GET";
	const url = "/api/groups";
	try {
		const result = yield call(axios, { method, url });
		const data = result.data;
		yield put(fetchGroupsSuccess(data));
	} catch (error) {
		yield put(fetchGroupsError(error));
	}
}

export function* watchFetchGroups(){
	yield takeEvery(DICT_GROUPS_TYPES.FETCH_GROUPS_SAGA, fetchGroups);
}