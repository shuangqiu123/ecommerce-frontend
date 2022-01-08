import { User } from "@/interface/User";
import request from "@/util/request";

export async function google(): Promise<string> {
	return request.get("/user/login/google/url");
}

export async function googleToken(code: string): Promise<User> {
	return request
		.post("/user/login/google/code", {
			code
		});
}