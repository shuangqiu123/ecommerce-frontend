import { EItemActionType } from "@/common/Item";
import { IItemBatchPostRequest, IItemDisplay, IItemLocalStorage, IItemMetadata } from "@/interface/Item";
import { IAction } from "@/interface/Redux";
import { batchGetItem, getItemById, getItemsById } from "@/service/Item";
import { addItemIntoCart, getItemsFromCart, removeItemFromCart } from "@/util/item";
import { IResponse } from "@/util/request";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { notification } from "antd";
import { setLoading } from "../Loading/action";

function* batchGetItemEffect({ payload, callback }: IAction<IItemBatchPostRequest>) {
	if (!payload) return;
	const response: IResponse<IItemMetadata> = yield call(batchGetItem, payload);
	callback?.(response.data);
}

function* getItemByIdEffect({ payload, callback }: IAction<string>) {
	if (!payload) return;
	const response: IResponse<IItemDisplay[]> = yield call(getItemById, payload);
	callback?.(response.data?.[0]);
}

function* addItemIntoCartEffect({ payload, callback }: IAction<IItemLocalStorage>) {
	if (!payload) return;
	yield put(setLoading(true));
	const response: IResponse<IItemDisplay[]> = yield call(getItemById, payload.id);
	const item = response.data?.[0];
	if (!item) return;
	if (item.num <= payload.quantity) {
		payload.quantity = item.num;
	}
	const success: boolean = yield call(addItemIntoCart, payload);
	if (success) {
		const localStorageItems: IItemLocalStorage[] = yield call(getItemsFromCart);
		yield put({
			type: EItemActionType.setCart,
			payload: localStorageItems
		});
	}
	yield put(setLoading(false));

	if (!success) {
		notification.error({
			message: "Item is already in the cart",
			duration: 3,
		});
	}
}

function* getItemsFromCartEffect({ payload, callback }: IAction<IItemLocalStorage[]>) {
	yield put(setLoading(true));
	if (!payload) {
		payload = yield call(getItemsFromCart);
		yield put({
			type: EItemActionType.setCart,
			payload
		});
	}
	if (!payload) return;
	const ids = payload.map((value) => value.id);
	const response: IResponse<IItemDisplay[]> = yield call(getItemsById, ids);
	callback?.(response.data);
	yield put(setLoading(false));
}

function* refreshCartEffect({ payload, callback }: IAction<void>) {
	payload = yield call(getItemsFromCart);
	yield put({
		type: EItemActionType.setCart,
		payload
	});
}

function* updateCartEffect({ payload, callback }: IAction<IItemLocalStorage>) {
	if (!payload) return;

	if (payload.quantity === -1) {
		yield call(removeItemFromCart, payload.id);
	}
	else {
		const response: IResponse<IItemDisplay> = yield call(getItemById, payload.id);
		const item = response.data;
		if (!item) return;
		if (item.num === 0) {
			yield call(removeItemFromCart, payload.id);
			notification.error({
				message: "An item is out of stock",
				duration: 3,
			});
		}
		else if (payload.quantity > item.num) {
			payload.quantity = item.num;
			notification.error({
				message: "You have set the maximum stock for an item",
				duration: 3,
			});
		}
	}
	const items: IItemLocalStorage[] = yield call(getItemsFromCart);
	for (const i of items) {
		if (i.id === payload.id) {
			i.quantity = payload.quantity;
		}
	}

	yield put({
		type: EItemActionType.setCart,
		payload: items
	});
}

export default function* watch(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EItemActionType.batchGetItems, batchGetItemEffect);
	yield takeEvery(EItemActionType.getItemById, getItemByIdEffect);
	yield takeEvery(EItemActionType.addItemIntoCart, addItemIntoCartEffect);
	yield takeEvery(EItemActionType.getItemsFromCart, getItemsFromCartEffect);
	yield takeEvery(EItemActionType.refreshCart, refreshCartEffect);
	yield takeEvery(EItemActionType.updateCartItem, updateCartEffect);
}