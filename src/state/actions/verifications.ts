/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as types from "../actionTypes/verifications";
import { BASE_URL } from "../constant/constants";
import { Dispatch } from "redux";
import {
	AddVerificationPayload,
	IMessage,
	TranscriptPayload,
} from "./action_types";
import { AppDispatch } from "../../store";
import { authInstance } from "../../api/axiosSetup";

export const addVerificationList = (payload: AddVerificationPayload[]) => {
	return {
		type: types.ADD_VERIFICATIONS,
		payload: payload,
	};
};

export const addTranscript = (payload: TranscriptPayload[]) => {
	return {
		type: types.ADD_TRANSCRIPT,
		payload: payload,
	};
};

export const deleteVerification = (payload: string) => {
	return {
		type: types.DELETE_VERIFICATION,
		payload,
	};
};

export const getOneUserVerifications = (payload: any) => {
	return {
		type: types.USER_VERIFICATIONS,
		payload,
	};
};
export const selectSchool = (payload: any) => {
	return {
		type: types.SELECT_SCHOOL,
		payload,
	};
};

export const getOneUserTranscript = (payload: any) => {
	return {
		type: types.GET_TRANSCRIPT,
		payload,
	};
};

export const messages = (payload: any) => {
	return {
		type: types.GET_MESSAGES,
		payload,
	};
};
export const delMessages = (payload: string) => {
	return {
		type: types.DELETE_MESSAGES,
		payload,
	};
};

export const requestVerification = (val: string, tranId: string) => {
	return axios.post(`${BASE_URL}/api/v1/verifications/request/${tranId}`, val);
};

export const getUserVerification =
	(email: string) => async (dispatch: AppDispatch) => {
		await authInstance
			.get(`/verifications/get-user-verifications/${email}`)
			.then(({ data }) => {
				dispatch(getOneUserVerifications(data.verifications));
			})
			.catch((err) => {
				return err;
			});
	};
export const getUserTranscript = () => async (dispatch: AppDispatch) => {
	await authInstance
		.get(`/transcripts/get-all`)
		.then(({ data }) => {
			dispatch(getOneUserTranscript(data.transcripts));
		})
		.catch((err) => {
			return err;
		});
};

export const sendMessage = (message: IMessage) =>
	axios.post(`${BASE_URL}/api/v1/message/sendMessage`, message);

export const getUserMessages = () => async (dispatch: Dispatch) => {
	await authInstance
		.get(`/messages/get-all`)
		.then(({ data }) => {
			dispatch(messages(data.message));
		})
		.catch((err) => {
			return err;
		});
};

export const deleteMessage = (id: string) => async (dispatch: Dispatch) => {
	await authInstance
		.delete(`/messages/delete/${id}`)
		.then(({ data }) => {
			dispatch(delMessages(data.message));
		})
		.catch((err) => {
			return err;
		});
};
