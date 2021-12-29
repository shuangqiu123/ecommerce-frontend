import { User, IUserLoginRequest, IUserPostRequest } from "@/interface/User";
import request from "@/util/request";

export async function login(userLoginRequest: IUserLoginRequest): Promise<User> {
	return request
		.post("/auth/login", userLoginRequest)
		.then(resp => {
			localStorage.setItem("eportfolio/token", resp.data.token);
			return resp.data;
		})
		.catch(error => {
			return null;
		});
}

export async function signup(userPostRequest: IUserPostRequest): Promise<User> {
	return request.post("/auth/signup", userPostRequest)
		.then(resp => {
			localStorage.setItem("eportfolio/token", resp.data.token);
			return resp.data;
		});
}