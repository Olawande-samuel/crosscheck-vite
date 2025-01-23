import * as types from "../actionTypes/users";
import axios from "axios";
import { BASE_URL } from "../constant/constants";
import { SignUpFormValues } from "../../component/auth/Register";

export const setLoading = (payload: boolean) => {
	return {
		type: types.SET_LOADING,
		payload,
	};
};

export const setRegisterError = (payload: string) => {
	return {
		type: types.SET_ERROR,
		payload,
	};
};

export const setLoginError = (payload: string) => {
	return {
		type: types.LOGIN_ERROR,
		payload,
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUser = (payload: any) => {
	return {
		type: types.SET_USER,
		payload,
	};
};

export const signUp = (user: SignUpFormValues) =>
	axios.post(`${BASE_URL}/api/v1/users/signup`, user);

export const login = (user: { email: string; password: string }) =>
	axios.post(`${BASE_URL}/api/v1/users/signin`, user);

export const forgotPassword = (data: { email: string }) =>
	axios.post(`${BASE_URL}/api/v1/users/forgot`, data);

export const resetPassword = (token: string, passwords:{
    newPassword: string;
    confirmPassword: string;
}) =>
	axios.put(`${BASE_URL}/api/v1/users/reset/${token}`, passwords);
