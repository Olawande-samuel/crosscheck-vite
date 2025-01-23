import axios from "axios";
import { BASE_URL } from "../state/constant/constants";
import { useNavigate } from "react-router";

const authInstance = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
});
const baseInstance = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
});

authInstance.interceptors.request.use(
	(config) => {
		const user = localStorage.getItem("crosscheckuser");
		if (user) {
			const data = JSON.parse(user);
			config.headers.Authorization = "Bearer " + data?.token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const useAxiosInterceptors = () => {
	const navigate = useNavigate();

	authInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (
				error.response &&
				(error.response.status === 401)
			) {
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);
};
export { authInstance, baseInstance };
