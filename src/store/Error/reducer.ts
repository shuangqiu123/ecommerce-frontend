import { EErrorActionTypes } from "@/common/Error";
import { IAction } from "@/interface/Redux";
import { IErrorStoreState } from "@/interface/Error";
import { Reducer } from "redux";
import { AnyAction, ReducersMapObject } from "redux";

const initialState: IErrorStoreState = {
	pageError: false
};

const setPageError: Reducer<IErrorStoreState, IAction<void>> = (
	state = initialState,
	{ payload }
) => {
	return payload? {
		...state,
	} : state;
};

const reducers: ReducersMapObject = {
	[EErrorActionTypes.setPageError]: setPageError
};

const errorReducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default errorReducer;