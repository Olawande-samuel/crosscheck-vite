import { authInstance, baseInstance } from "./axiosSetup";

class Api {
	async getInstitutions(data: {
		country: string;
		offset: string;
		limit: string;
	}) {
		const query = new URLSearchParams(data);
		try {
			const response = await authInstance.get(`/institutions/get-all?${query}`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async verifyUser(data: { token: string }) {
		const query = new URLSearchParams(data);
		try {
			const response = await baseInstance.get(`/users/verify?${query}`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getTranscripts(
		data: {
			status: string;
			offset: string;
			limit: string;
		} | null
	) {
		let query;
		if (data) {
			query = new URLSearchParams(data);
		}
		try {
			const response = await authInstance.get(`/transcripts/get-all?${query}`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export const API = new Api();
