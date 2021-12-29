import { User } from "@/interface/User";
import request from "@/util/request";

export async function google(): Promise<string> {
	return request
		.get("/auth/oauth/google")
		.then(res => res.data);
}

export async function googleToken(code: string): Promise<User> {
	return request
		.post("/auth/oauth/google/token", {
			code
		})
		.then(res => res.data);
}