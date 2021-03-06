import { IOrderCreateRequest, IOrder, IOrderCreateResponse, IOrderGetResponse, IOrderCompletionRequest, IOrderCompletionResponse, IOrderPaymentRequest } from "@/interface/Order";
import request from "@/util/request";

export async function createOrder(payload: IOrderCreateRequest): Promise<IOrderCreateResponse> {
	return request.post("/order/createOrder", payload);
}

export async function getOrder(payload: string): Promise<IOrderGetResponse> {
	return request.get("/order/getOrder?orderId=" + payload);
}

export async function getOrderPayment(payload: IOrderCompletionRequest): Promise<IOrderCompletionResponse> {
	return request.post("/order/getOrderPayment", payload);
}

export async function payOrder(payload: IOrderPaymentRequest): Promise<IOrderCompletionResponse> {
	return request.post("/order/payOrder", payload);
}

export async function getOrderList(): Promise<IOrder[]> {
	return request.get("/order/getOrderListByUserId");
}

export async function cancelOrder(orderId: string): Promise<void> {
	return request.get("/order/cancelOrder?orderId=" + orderId);
}