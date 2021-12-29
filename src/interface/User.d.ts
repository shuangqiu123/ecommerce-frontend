export interface User {
	userId: string;
	userName: string;
	tags: string[];
	email: string;
	name: string;
	description?: string;
	isVerified?: boolean;
}

export interface IUserStoreState {
	userId: string;
	userName: string;
	tags: string[];
	email: string;
	name: string;
	description?: string;
	isVerified?: boolean;
}

export interface IUserLoginRequest {
	userName?: string;
	email?: string;
	password: string;
}

export interface IUserLoginForm {
	userNameOrEmail: string;
	password: string;
}

export interface IUserPostRequest {
	userId?: string;
	userName: string;
	email: string;
	password: string;
	tags: string[];
	name: string;
	description?: string;
}