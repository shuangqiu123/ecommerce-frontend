import { EUserActionTypes } from "@/common/User";
import { IAction } from "@/interface/Redux";
import { IUserLoginRequest, IUserPostRequest, IUserResetPasswordRequest, User } from "@/interface/User";
import { forgotPassword, login, resetPassword, signup } from "@/service/User";
import { setItem } from "@/util/localstorage";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { setUser } from "./action";

function* loginEffect({ payload, callback }: IAction<IUserLoginRequest>) {
	if (!payload) {
		return;
	}
	const user: User = yield call(login, payload);
	if (user !== null) {
		yield put(setUser(user));
		callback?.();
	}
	setItem("/eportfolio/user", user);
}

function* signupEffect({ payload }: IAction<IUserPostRequest>) {
	if (!payload) {
		return;
	}
	const user: User = yield call(signup, payload);
	yield put(setUser(user));
	setItem("/eportfolio/user", user);
}

function* forgotPasswordEffect({ payload }: IAction<string>) {
	if (!payload) {
		return;
	}
	yield call(forgotPassword, payload);
}

function* resetPasswordEffect({ payload }: IAction<IUserResetPasswordRequest>) {
	if (!payload) {
		return;
	}
	yield call(resetPassword, payload);
}


export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EUserActionTypes.login, loginEffect);
	yield takeEvery(EUserActionTypes.signup, signupEffect);
	yield takeEvery(EUserActionTypes.forgotPassword, forgotPasswordEffect);
	yield takeEvery(EUserActionTypes.resetPassword, resetPasswordEffect);
}