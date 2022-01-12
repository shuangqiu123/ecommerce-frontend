import { EItemActionType } from "@/common/Item";
import { EOrderActionTypes } from "@/common/Order";
import { IItemLocalStorage } from "@/interface/Item";
import { IOrderCreateResponse, IOrderGetResponse } from "@/interface/Order";
import { IAction } from "@/interface/Redux";
import { createOrder, getOrder } from "@/service/Order";
import { getItemsFromCart, setCart } from "@/util/item";
import { IResponse } from "@/util/request";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { notification } from "antd";
import { setLoading } from "../Loading/action";

function* createOrderEffect({ callback }: IAction<void>) {
	yield put(setLoading(true));
	const items: IItemLocalStorage[] = yield call(getItemsFromCart);
	if (items.length === 0) {
		return;
	}
	const order:IResponse<IOrderCreateResponse> = yield call(createOrder, { items });
	if (order.data?.isChanged) {
		yield call(setCart, order.data.items);
		notification.error({
			message: "Some items have been updated due to low stock or out of stock. Please review again.",
			duration: 3,
		});
		callback?.();
		return;
	}
	yield call(setCart, []);
	yield put({
		type: EItemActionType.refreshCart
	});
	yield put(setLoading(false));
	callback?.(order.data?.id);
}

function* getOrderEffect({ payload, callback }: IAction<string>) {
	if (!payload) return;
	yield put(setLoading(true));
	const response: IResponse<IOrderGetResponse> = yield call(getOrder, payload);
	yield put(setLoading(false));
	if (response.status === 404) {
		callback?.();
		return;
	}
	callback?.(response.data);
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EOrderActionTypes.createOrder, createOrderEffect);
	yield takeEvery(EOrderActionTypes.getOrder, getOrderEffect);
}