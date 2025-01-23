import { debounce } from "lodash";
import useUser from "./useUser";

interface Props {
	total: number;
	userCountry: string;
	cb: VoidFunction;
}

const useFlutterwaveConfig = ({ total, userCountry, cb }: Props) => {
	const user = useUser();

	const config = {
		public_key: import.meta.env.VITE_APP_PUBLIC_KEY ?? "",
		tx_ref: Date.now().toString(),
		amount: total,
		currency: userCountry === "NG" ? "NGN" : "USD",
		payment_options: "card,mobilemoney,ussd",
		customer: {
			email: user?.email ?? "",
			phone_number: user?.phone ?? "",
			name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
		},
		customizations: {
			title: "CrossCheck",
			description: "Payment for Transcript",
			logo: "https://i.ibb.co/f048df8/logo.png",
		},
	};
	const fwConfig = {
		...config,
		text: "Pay Now!",
		callback: debounce((response) => {
			if (response?.status === "successful") {
				cb();
			}
		}, 1000),
		onClose: () => {},
	};

	return fwConfig;
};

export default useFlutterwaveConfig;
