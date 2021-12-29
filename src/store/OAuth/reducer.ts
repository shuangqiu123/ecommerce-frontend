import { EOAuthActionTypes } from "@/common/OAuth";
import { IOAuthStoreState } from "@/interface/OAuth";
import { IAction } from "@/interface/Redux";
import { AnyAction, Reducer } from "redux";
import { ReducersMapObject } from "redux";

const initialState: IOAuthStoreState = {
	url: ""
};

const setURL: Reducer<IOAuthStoreState, IAction<string>> = (
	state = initialState,
	{ payload }
) => {
	return payload? {
		url: payload
	} : state;
};

const reducers: ReducersMapObject = {
	[EOAuthActionTypes.setURL]: setURL
};

const oauthReducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default oauthReducer;