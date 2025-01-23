// import React from "react";
import axios, { CancelTokenSource } from "axios";
import store from "../../../store";
import {
	fetchInstitutes,
	setPageInfo,
	noInstitute,
} from "../../../state/actions/institutions";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const toDollar = (amount: string | number) => {
	console.log({ amount });
	const USD = 382;
	return Math.round(Number(amount) / Number(USD));
};

type Resources = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};
const resources: Resources = {};

const makeRequestCreator = () => {
	let cancel: CancelTokenSource;

	return async (query: string) => {
		if (cancel) {
			// Cancel the previous request before making a new request
			cancel.cancel();
		}
		// Create a new CancelToken
		cancel = axios.CancelToken.source();
		try {
			if (resources[query]) {
				// Return result if it exists
				return resources[query];
			}
			let token = "";
			const user = localStorage.getItem("crosscheckuser");
			if (user) {
				token = JSON.parse(user)?.token;
			}
			const res = await axios(query, {
				cancelToken: cancel.token,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { docs, totalDocs, totalPages, hasPrevPage, hasNextPage, page } =
				res.data.institution;
			if (docs.length === 0) {
				store.dispatch(noInstitute(true));
			}
			store.dispatch(fetchInstitutes(docs));
			store.dispatch(
				setPageInfo({ totalDocs, totalPages, hasPrevPage, hasNextPage, page })
			);
			// Store response
			// resources[query] = docs;

			return docs;
		} catch (error) {
			if (axios.isCancel(error)) {
				// Handle if request was cancelled
				return error.message;
			} else {
				// Handle usual errors
				if (axios.isCancel(error)) {
					return error.message;
				} else if (axios.isAxiosError(error)) {
					return error.message;
				} else {
					// Handle other types of errors
					return "An unexpected error occurred.";
				}
			}
		}
	};
};

export const search = makeRequestCreator();
