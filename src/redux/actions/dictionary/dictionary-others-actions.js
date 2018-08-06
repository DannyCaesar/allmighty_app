export const DICT_OTHERS_TYPES = {
	HIDE_ELEMENTS: 'HIDE_ELEMENTS',
	HIDE_COLUMN: 'HIDE_COLUMN'
}

export function onHideElements(status) {
	return { 
		type: DICT_OTHERS_TYPES.HIDE_ELEMENTS, 
		payload: status 
	}
}

export function onHide(language) {
	return { 
		type: DICT_OTHERS_TYPES.HIDE_COLUMN, 
		payload: language 
	}
}