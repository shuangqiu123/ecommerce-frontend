import { EItemActionType } from "@/common/Item";
import { IItemLocalStorage, IItemStoreState } from "@/interface/Item";
import { IAction } from "@/interface/Redux";
import { getItemsFromCart } from "@/util/item";
import { Reducer, ReducersMapObject, AnyAction } from "redux";

const initialState: IItemStoreState = {
	cartItems: getItemsFromCart()
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

const reducers: ReducersMapObject = {
	[EItemActionType.setCart]: setCart
};

const reducer: Reducer = (state = initialState, action: AnyAction) => reducers[action.type]?.(state, action) || state;

export default reducer;