import { EItemActionType } from "@/common/Item";
import { EOrderActionTypes } from "@/common/Order";
import { IItemLocalStorage } from "@/interface/Item";
import { IOrderCreateResponse, IOrderGetResponse, IOrderCompletionRequest, IOrderCompletionResponse, IOrderPaymentRequest } from "@/interface/Order";
import { IAction } from "@/interface/Redux";
import { createOrder, getOrder, getOrderPayment, payOrder } from "@/service/Order";
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
		// need proper error definition
		callback?.();
		return;
	}
	callback?.(response.data);
}

function* getOrderPaymentEffect({ payload, callback }: IAction<IOrderCompletionRequest>) {
	if (!payload) return;
	yield put(setLoading(true));
	const response: IResponse<IOrderCompletionResponse> = yield call(getOrderPayment, payload);
	yield put(setLoading(false));
	if (response.status === 404) {
		notification.error({
			message: response.error?.order,
			duration: 3,
		});	
		callback?.(null, response.error?.order);
		return;
	}
	if (response.data?.isChanged) {
		notification.error({
			message: "Some items have been updated due to low stock or out of stock. Please review again.",
			duration: 3,
		});	
	}
	callback?.(response.data, null);
}

function* payOrderEffect({ payload, callback }: IAction<IOrderPaymentRequest>) {
	if (!payload) return;
	yield put(setLoading(true));
	const response: IResponse<IOrderCompletionResponse> = yield call(payOrder, payload);
	yield put(setLoading(false));
	if (response.status === 404) {
		if (response.error?.order) {
			notification.error({
				message: response.error?.order,
				duration: 3,
			});	
		}
		else if (response.error?.payment) {
			notification.error({
				message: response.error?.payment,
				duration: 3,
			});	
		}
		callback?.(null, response.error);
		return;
	}
	if (response.data?.isChanged) {
		notification.error({
			message: "Some items have been updated due to low stock or out of stock. Please review again.",
			duration: 3,
		});	
	}
	callback?.(response.data, null);
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EOrderActionTypes.createOrder, createOrderEffect);
	yield takeEvery(EOrderActionTypes.getOrder, getOrderEffect);
	yield takeEvery(EOrderActionTypes.getOrderPayment, getOrderPaymentEffect);
	yield takeEvery(EOrderActionTypes.payOrder, payOrderEffect);
}