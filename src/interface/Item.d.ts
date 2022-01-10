export interface IItemBatchPostRequest {
	pageNum: number;
	pageSize: number;
	brand?: string;
	priceRangeLow?: number;
	priceRangeHigh?: number;
	sort?: Sort;
	category?: Category;
}

export interface IItemMetadata {
	itemBatchDisplayList: IItemBatchDisplay[];
	total: number;
}

interface IItemBatchDisplay {
	id: string;
	title: string;
	price: number;
	num: number;
	isNewIn: boolean;
	image: string;
}

interface IItemLocalStorage {
	id: string;
	quantity: number;
}

interface IItemDisplay {
	id: string;
	title: string;
	price: number;
	num: number;
	isNewIn: boolean;
	image: string;
	description: string;
	brand: string;
	quantity?: number;
}

interface IItemStoreState {
	cartItems: IItemLocalStorage[]
}

enum Sort {
	Newest = 0,
	PriceLowToHigh = 1,
	PriceHightToLow = 2
}

export enum Category {
	NewIn = 0,
	Popular = 1
}