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
}