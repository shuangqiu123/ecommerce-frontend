import { IItemBatchPostRequest, IItemMetadata, IItemDisplay } from "@/interface/Item";
import request from "@/util/request";

export async function batchGetItem(itemBatchPostRequest: IItemBatchPostRequest): Promise<IItemMetadata> {
	return request.post("/item/getAllItems", itemBatchPostRequest);
} 

export async function getItemById(id: string): Promise<IItemDisplay> {
	return request.get("/item/getItemById/" + id);
}