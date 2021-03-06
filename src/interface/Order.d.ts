import { IItemLocalStorage } from "./Item";

interface IOrderCreateRequest {
	items: IItemLocalStorage[];
}

interface IOrderCreateResponse {
	items?: IItemLocalStorage[];
	isChanged?: boolean;
	id?: string;
}

interface IOrderGetResponse {
	items: IItemDisplay[];
	price: number;
	viewOnly: boolean;
	shippingAddress?: IOrderShipping;
}

interface IOrderCompletionRequest {
	orderId: string;
	shippingDto?: IOrderShipping;
}

interface IOrderCompletionResponse {
	items?: IItemDisplay[];
	isChanged?: boolean;
	url?: string;
}

interface IOrderShipping {
	receiverName: string;
	receiverState: string;
	receiverCity: string;
	receiverAddress: string;
	receiverZip: string;
}

interface IOrderShippingForm {
	firstname: string;
	lastname: string;
	streetaddress1: string;
	streetaddress2: string;
	suburb: string;
	state: string;
	postcode: string;
	remember: boolean;
}

interface IOrderPaymentRequest {
	orderId: string;
	paymentId: string;
	payerId: string;
}

interface IOrder {
	orderId: string;
	payment: number;
	status: number;
	shippingName: string;
	createTime: string;
}