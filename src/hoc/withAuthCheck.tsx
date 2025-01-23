import { useAxiosInterceptors } from "@/api/axiosSetup";
import { ComponentType, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const withAuthCheck = <P extends object>(Component: ComponentType<P>) => {
	const AuthComponent = (props: P) => {
		useAxiosInterceptors();
		const navigate = useNavigate();
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const data = localStorage.getItem("crosscheckuser");

		useEffect(() => {
			if (!data) {
				navigate("/login");
			} else {
				setIsAuthenticated(true);
			}
		}, [navigate, data]);

		if (!isAuthenticated) return null;

		return <Component {...props} />;
	};
	const displayName = Component.displayName || Component.name || "Component";
	AuthComponent.displayName = `withAuthCheck ${displayName}`;
	return AuthComponent;
};
export default withAuthCheck;
