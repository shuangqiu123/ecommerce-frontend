import { IOrderCreateRequest, IOrderCreateResponse, IOrderGetResponse } from "@/interface/Order";
import request from "@/util/request";

export async function createOrder(payload: IOrderCreateRequest): Promise<IOrderCreateResponse> {
	return request.post("/order/createOrder", payload);
}

export async function getOrder(payload: string): Promise<IOrderGetResponse> {
	return request.get("/order/getOrder?orderId=" + payload);
}