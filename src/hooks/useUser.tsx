import { useEffect, useState } from "react";

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	country: string;
	token: string;
};

const useUser = () => {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const val = localStorage.getItem("crosscheckuser");
		if (val) {
			const result = JSON.parse(val);
			setUser(result);
		}
	}, []);
	return user;
};

export default useUser;
