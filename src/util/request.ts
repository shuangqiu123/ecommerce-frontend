import axios, { AxiosRequestConfig } from "axios";
import { notification } from "antd";
import { setItem } from "./localstorage";

const HOST = process.env.REACT_APP_SERVER_HOST;
const token = localStorage.getItem("/demostore/token") || "";

export interface IResponse<T> {
	data?: T;
	error?: Record<string, string>;
	status?: number;
}

const httpClient = axios.create({
	baseURL: `${HOST}/`,
	headers: {
		"Content-type": "application/json; charset=utf-8",
		"Authorization": token
	}
});

httpClient.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return {
			...config
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(
	(response) => { 
		return {
			data: response.data.object,
			status: response.status
		};
	},
	(error) => {
		const status = error.response.status;
		const errors = error.response.data.errors;

		if (status === 404) {
			return {
				error: errors,
				status
			};
		}
		else if (status === 401) {
			notification.error({
				message: "Unauthorised request",
				duration: 3,
			});
			return;
		}
		else if (status === 403) {
			setItem("/demostore/user", null);
			notification.error({
				message: "Token has expired.",
				duration: 2,
			});
			setTimeout(() => {
				window.location.href = "/user/login";
			}, 2500);
			return;
		}
		else if (status >= 500) {
			notification.error({
				message: "Server Error: " + status,
				duration: 3,
			});
			return;
		}
		return null;
	}
);

export default httpClient;