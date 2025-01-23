import { AddVerificationPayload } from "@/state/actions/action_types";
import { create } from "zustand";

type StoreData = { data: AddVerificationPayload[] };

type StoreAction = {
	addVerification: (val: AddVerificationPayload[]) => void;
	deleteVerification: (val: number) => void;
};

type Store = StoreData & StoreAction;

export const useVerificationStore = create<Store>()((set, get) => ({
	data: [],
	addVerification: (val) => set({ data: val }),
	deleteVerification: (val) => {
		const newData = get().data.filter((_, index) => index !== val);
		set({ data: newData });
	},
}));
