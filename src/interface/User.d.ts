export interface User {
	id: string;
	username: string;
	email: string;
	isverified?: string;
}

export interface IUserStoreState {
	id: string;
	username: string;
	email: string;
	isverified?: string;
}

export interface IUserLoginRequest {
	username: string;
	password: string;
}

export interface IUserLoginForm {
	usernameOrEmail: string;
	password: string;
}

export interface IUserPostRequest {
	id?: string;
	username: string;
	email: string;
	password: string;
}

export interface IUserResetPasswordRequest {
	password: string;
	token: string;
}