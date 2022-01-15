import { EOAuthActionTypes } from "@/common/OAuth";
import { IAction } from "@/interface/Redux";
import { User } from "@/interface/User";
import { google, googleToken } from "@/service/OAuth";
import { setItem } from "@/util/localstorage";
import { IResponse } from "@/util/request";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { setUser } from "../User/action";

function* googleSignInEffect({ callback }: IAction<string>) {
	const url: IResponse<string> = yield call(google);
	callback?.(url.data);
}

function* googleTokenEffect({ payload, callback }: IAction<string>) {
	if (!payload) return;
	const response: IResponse<User> = yield call(googleToken, payload);
	const user: User | undefined = response.data;
	if (!user) return;
	yield put(setUser(user));
	yield call(setItem, "/demostore/user", user);
	callback?.();
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EOAuthActionTypes.googleSignIn, googleSignInEffect);
	yield takeEvery(EOAuthActionTypes.googleToken, googleTokenEffect);
}