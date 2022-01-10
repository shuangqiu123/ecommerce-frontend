import { BreadCrumbFill } from "@/layout/ShopLayout/ShopLayout";

export interface ILoadingStoreState {
	loading: boolean;
}

export interface HistoryState {
	breadCrumb: BreadCrumbFill[];
}