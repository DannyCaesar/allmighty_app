import { put, takeEvery, select, call } from 'redux-saga/effects';
import { 
	DICT_GROUPS_TYPES, 
	fetchGroupsSuccess, fetchGroupsError, 
	addGroupSuccess, addGroupError 
} from '../../actions/dictionary/dictionary-groups-actions';
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

function* addGroup(payload){
	//payload is object { name: " " }
	const url = "/api/groups";
	try {
		yield axios.post(url, payload.payload);
		const result = yield axios.get(url);
		const dataFetched = result.data;
		let buffer = null;
		dataFetched.forEach((item) => {
			if (item.name === payload.payload.name) 
				buffer = item;
		})
		if (buffer !== null)
			yield put(addGroupSuccess(buffer)); // sending the object of a group
	} catch (error) {
		yield put(addGroupError(error));
	}
}

export function* watchAddGroup(){
	yield takeEvery(DICT_GROUPS_TYPES.ADD_GROUP_SAGA, addGroup);
	return 'test';
}