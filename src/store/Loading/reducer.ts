import { ELoadingActionTypes } from "@/common/Loading";
import { ILoadingStoreState } from "@/interface/Loading";
import { IAction } from "@/interface/Redux";
import { Reducer, ReducersMapObject, AnyAction } from "redux";

const initialState: ILoadingStoreState = {
	loading: false
};

const setLoading: Reducer<ILoadingStoreState, IAction<boolean>> = (
	state = initialState,
	{ payload }
) => {
	if (payload === void(0)) {
		return state;
	}
	return {
		...state,
		loading: payload
	};
};

const reducers: ReducersMapObject = {
	[ELoadingActionTypes.setLoading]: setLoading
};

const reducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default reducer;