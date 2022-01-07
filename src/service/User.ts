import { User, IUserLoginRequest, IUserPostRequest, IUserResetPasswordRequest } from "@/interface/User";
import request from "@/util/request";

export async function login(userLoginRequest: IUserLoginRequest): Promise<User> {
	return request.post("/user/login/normal", userLoginRequest);
}

export async function signup(userPostRequest: IUserPostRequest): Promise<User> {
	return request.post("/user/register/normal", userPostRequest);
}

export async function forgotPassword(email: string): Promise<void> {
	return request.get("/user/forgotPassword?email=" + email);
}

export async function resetPassword(resetPasswordRequest: IUserResetPasswordRequest): Promise<void> {
	return request.post("/user/resetPassword", resetPasswordRequest);
}

export async function verifyEmail(token: string): Promise<void> {
	return request.get("/user/verifyEmail", {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	});
}