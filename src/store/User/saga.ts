import { EUserActionTypes } from "@/common/User";
import { IAction } from "@/interface/Redux";
import { IUserLoginRequest, IUserPostRequest, IUserResetPasswordRequest, User } from "@/interface/User";
import { forgotPassword, login, resetPassword, signup } from "@/service/User";
import { setItem } from "@/util/localstorage";
import { IResponse } from "@/util/request";
import { call, ForkEffect, put, takeEvery } from "@redux-saga/core/effects";
import { setUser } from "./action";

function* loginEffect({ payload, callback }: IAction<IUserLoginRequest>) {
	if (!payload) {
		return;
	}
	const userResponse: IResponse<User> = yield call(login, payload);

	if (userResponse.error) {
		callback?.(userResponse.error);
		return;
	}
	if (!userResponse.data) return;

	yield put(setUser(userResponse.data));
	setItem("/demostore/user", userResponse.data);
	callback?.();
}

function* signupEffect({ payload, callback }: IAction<IUserPostRequest>) {
	if (!payload) {
		return;
	}
	const userResponse: IResponse<User> = yield call(signup, payload);

	if (userResponse.error) {
		callback?.(userResponse.error);
		return;
	}
	if (!userResponse.data) return;

	yield put(setUser(userResponse.data));
	setItem("/demostore/user", userResponse.data);
	callback?.();
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