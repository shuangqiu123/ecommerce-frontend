import { EItemActionType } from "@/common/Item";
import { EOrderActionTypes } from "@/common/Order";
import { IItemLocalStorage } from "@/interface/Item";
import { IOrderCreateResponse, IOrderGetResponse, IOrderCompletionRequest, IOrderCompletionResponse, IOrderPaymentRequest, IOrderShippingForm, IOrder } from "@/interface/Order";
import { IAction } from "@/interface/Redux";
import { cancelOrder, createOrder, getOrder, getOrderList, getOrderPayment, payOrder } from "@/service/Order";
import { getItemsFromCart, setCart } from "@/util/item";
import { getAddressInformation, saveAddressInformation } from "@/util/order";
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
		yield put({
			type: EItemActionType.refreshCart
		});
		yield put(setLoading(false));
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
		if (response.data?.items && response.data?.items?.length > 0) {
			notification.error({
				message: "Some items have been updated due to low stock or out of stock. Please review again.",
				duration: 3,
			});	
		}
		else {
			notification.error({
				message: "Orders will be closed due to none of the items are in stock",
				duration: 3,
			});	
		}
	}
	callback?.(response.data, null);
}

function* payOrderEffect({ payload, callback }: IAction<IOrderPaymentRequest>) {
	if (!payload) return;
	const response: IResponse<IOrderCompletionResponse> = yield call(payOrder, payload);
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
		if (response.data?.items && response.data?.items?.length > 0) {
			notification.error({
				message: "Some items have been updated due to low stock or out of stock. Please review again.",
				duration: 3,
			});	
		}
		else {
			notification.error({
				message: "Orders will be closed due to none of the items are in stock",
				duration: 3,
			});	
		}
	}
	callback?.(response.data, null);
}

function* saveShippingEffect({ payload }: IAction<IOrderShippingForm>) {
	if (!payload) return;
	yield call(saveAddressInformation, payload);
}

function* getShippingEffect({ payload, callback }: IAction<void>) {
	const info: IOrderShippingForm = yield call(getAddressInformation);
	callback?.(info);
}

function* getOrderListEffect({ callback }: IAction<void>) {
	const response: IResponse<IOrder[]> = yield call(getOrderList);
	callback?.(response.data);
}

function* cancelOrderEffect({ payload, callback }: IAction<string>) {
	if (!payload) return;
	yield call(cancelOrder, payload);
	callback?.();
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EOrderActionTypes.createOrder, createOrderEffect);
	yield takeEvery(EOrderActionTypes.getOrder, getOrderEffect);
	yield takeEvery(EOrderActionTypes.getOrderPayment, getOrderPaymentEffect);
	yield takeEvery(EOrderActionTypes.payOrder, payOrderEffect);
	yield takeEvery(EOrderActionTypes.saveShippingInfo, saveShippingEffect);
	yield takeEvery(EOrderActionTypes.getShippingInfo, getShippingEffect);
	yield takeEvery(EOrderActionTypes.getOrderList, getOrderListEffect);
	yield takeEvery(EOrderActionTypes.cancelOrder, cancelOrderEffect);
}