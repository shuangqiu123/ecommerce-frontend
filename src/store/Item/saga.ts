import { EItemActionType } from "@/common/Item";
import { IItemBatchPostRequest, IItemMetadata } from "@/interface/Item";
import { IAction } from "@/interface/Redux";
import { batchGetItem } from "@/service/Item";
import { IResponse } from "@/util/request";
import { call, ForkEffect, takeEvery } from "@redux-saga/core/effects";

function* batchGetItemEffect({ payload, callback }: IAction<IItemBatchPostRequest>) {
	if (!payload) return;
	const response: IResponse<IItemMetadata> = yield call(batchGetItem, payload);
	callback?.(response.data);
}

export default function* watch(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EItemActionType.batchGetItems, batchGetItemEffect);
}