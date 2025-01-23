import { authInstance } from "@/api/axiosSetup";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInstitutes, setPageInfo } from "../state/actions/institutions";
import { isAxiosError } from "axios";

const useFetchInstitution = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const institutionByCountry = useCallback(
		async ({
			country,
			offset,
			limit,
			name,
		}: {
			country?: string;
			offset: number;
			limit: number;
			name?: string;
		}) => {
			try {
				setIsLoading(true);
				const searchParams = new URLSearchParams();
				if (country) searchParams.append("country", country);
				if (name) searchParams.append("name", name);
				searchParams.append("offset", offset.toString());
				searchParams.append("limit", limit.toString());

				const { data } = await authInstance.get(
					`/institutions/get-all?${searchParams}`
				);
				const { totalDocs, totalPages, hasPrevPage, hasNextPage, page } =
					data.institution;
				setError("");

				dispatch(fetchInstitutes(data.institution.docs));
				dispatch(
					setPageInfo({ totalDocs, totalPages, hasPrevPage, hasNextPage, page })
				);
			} catch (err: unknown) {
				if (isAxiosError(err)) {
					const message = err.response?.data.message;
					setError(message);
				} else {
					setError(
						err instanceof Error ? err.message : "An unknown error occurred"
					);
				}
			} finally {
				setIsLoading(false);
			}
		},

		[dispatch]
	);
	return { fetchInstitution: institutionByCountry, isLoading, error };
};

export default useFetchInstitution;
