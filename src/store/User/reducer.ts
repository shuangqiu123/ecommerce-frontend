import { EUserActionTypes } from "@/common/User";
import { IAction } from "@/interface/Redux";
import { IUserStoreState, User } from "@/interface/User";
import { Reducer } from "redux";
import { AnyAction, ReducersMapObject } from "redux";

const initialState: IUserStoreState = {
	id: "",
	username: "",
	email: "",
	isverified: "N"
};

const setUser: Reducer<IUserStoreState, IAction<User>> = (
	state = initialState,
	{ payload }
) => {
	return payload? {
		...state,
		...payload
	} : state;
};

const reducers: ReducersMapObject = {
	[EUserActionTypes.setUser]: setUser
};
const userReducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default userReducer;