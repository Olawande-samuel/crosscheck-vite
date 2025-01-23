import { useEffect, useState } from "react";

const fetchLocation = async () => {
	try {
		const response = await fetch("https://ipapi.co/json/");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		if (!data?.country || typeof data.country !== "string") {
			throw new Error("Invalid country data received");
		}
		return data.country;
	} catch (err) {
		console.error("Error fetching location:", err);
		return;
	}
};

const useUserLocation = (): string => {
	const [location, setLocation] = useState(() => {
		return localStorage.getItem("location") || "";
	});

	useEffect(() => {
		if (!location) {
			let isMounted = true;

			fetchLocation().then((data) => {
				if (isMounted && data) {
					setLocation(data);
					localStorage.setItem("location", data);
				}
			});

			return () => {
				isMounted = false;
			};
		}
	}, [location]);

	return location;
};

export default useUserLocation;
