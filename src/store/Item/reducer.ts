import { EItemActionType } from "@/common/Item";
import { IItemLocalStorage, IItemStoreState } from "@/interface/Item";
import { IAction } from "@/interface/Redux";
import { getItemFromSave, getItemsFromCart } from "@/util/item";
import { Reducer, ReducersMapObject, AnyAction } from "redux";

const initialState: IItemStoreState = {
	cartItems: getItemsFromCart(),
	savedItems: getItemFromSave()
};

const setCart: Reducer<IItemStoreState, IAction<IItemLocalStorage[]>> = (
	state = initialState,
	{ payload }
) => {
	if (payload === void(0)) {
		return state;
	}
	return {
		...state,
		cartItems: payload
	};
};

const setSave: Reducer<IItemStoreState, IAction<string[]>> = (
	state = initialState,
	{ payload }
) => {
	if (payload === void(0)) {
		return state;
	}
	return {
		...state,
		savedItems: payload
	};
};

const reducers: ReducersMapObject = {
	[EItemActionType.setCart]: setCart,
	[EItemActionType.setSave]: setSave
};

const reducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default reducer;