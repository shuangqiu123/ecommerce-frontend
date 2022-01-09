import { EErrorActionTypes } from "@/common/Error";
import { IAction } from "@/interface/Redux";
import { IErrorStoreState } from "@/interface/Error";
import { Reducer } from "redux";
import { AnyAction, ReducersMapObject } from "redux";
import { setItem } from "@/util/localstorage";

const initialState: IErrorStoreState = {
	pageError: false,
	tokenError: false
};

const setPageError: Reducer<IErrorStoreState, IAction<void>> = (
	state = initialState,
	{ payload }
) => {
	return payload? {
		...state,
	} : state;
};

const setTokenError: Reducer<IErrorStoreState, IAction<void>> = (
	state = initialState,
	{ payload }
) => {
	setItem("/demostore/user", null);
	return payload? {
		...state,
		tokenError: payload
	} : state;
};

const reducers: ReducersMapObject = {
	[EErrorActionTypes.setPageError]: setPageError,
	[EErrorActionTypes.tokenError]: setTokenError
};

const errorReducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default errorReducer;