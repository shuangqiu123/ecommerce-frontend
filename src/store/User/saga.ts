import { EUserActionTypes } from "@/common/User";
import { IAction } from "@/interface/Redux";
import { IUserLoginRequest, IUserPostRequest, IUserResetPasswordRequest, User } from "@/interface/User";
import { forgotPassword, login, resetPassword, signup, verifyEmail } from "@/service/User";
import { getItem, setItem } from "@/util/localstorage";
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
	yield call(setItem, "/demostore/user", userResponse.data);
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
	yield call(setItem, "/demostore/user", userResponse.data);
	callback?.();
}

function* verifyEmailEffect({ payload, callback }: IAction<string>) {
	if (!payload) {
		return;
	}
	yield call(verifyEmail, payload);
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

function* refreshUserEffect({ payload }: IAction<null>) {
	const user: User | null = yield call(getItem, "/demostore/user");
	if (!user) return;

	yield put({
		type: EUserActionTypes.setUser,
		payload: user
	});
}

function* logoutEffect({ payload }: IAction<null>) {
	yield call(setItem, "/demostore/user", null);
	yield put({
		type: EUserActionTypes.setUser,
		payload: {
			username: "",
			email: "",
			id: "",
			isverified: "N"
		}
	});
}

export default function* watchUser(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(EUserActionTypes.login, loginEffect);
	yield takeEvery(EUserActionTypes.signup, signupEffect);
	yield takeEvery(EUserActionTypes.forgotPassword, forgotPasswordEffect);
	yield takeEvery(EUserActionTypes.resetPassword, resetPasswordEffect);
	yield takeEvery(EUserActionTypes.verifyEmail, verifyEmailEffect);
	yield takeEvery(EUserActionTypes.refreshUser, refreshUserEffect);
	yield takeEvery(EUserActionTypes.logout, logoutEffect);
}