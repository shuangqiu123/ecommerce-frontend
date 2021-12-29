import { EOAuthActionTypes } from "@/common/OAuth";
import { IAction } from "@/interface/Redux";
import { User } from "@/interface/User";
import { google, googleToken } from "@/service/OAuth";
import { setItem } from "@/util/localstorage";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { setUser } from "../User/action";
import { setURL } from "./action";

function* googleSignInEffect({ callback }: IAction<string>) {
	const url: string = yield call(google);
	callback?.(url);
	yield put(setURL(url));
}

function* googleTokenEffect({ payload, callback }: IAction<string>) {
	if (!payload) return;
	const user: User = yield call(googleToken, payload);
	callback?.(user);
	yield put(setUser(user));
	setItem("eportfolio/user", user);
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EOAuthActionTypes.googleSignIn, googleSignInEffect);
	yield takeEvery(EOAuthActionTypes.googleToken, googleTokenEffect);
}