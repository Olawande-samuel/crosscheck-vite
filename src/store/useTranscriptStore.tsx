import { TranscriptPayload } from "@/state/actions/action_types";
import { create } from "zustand";

type StoreData = { data: TranscriptPayload[] };

type StoreAction = {
	addTranscript: (val: TranscriptPayload[]) => void;
	deleteTranscript: (val: number) => void;
};

type Store = StoreData & StoreAction;

export const useTranscriptStore = create<Store>()((set, get) => ({
	data: [],
	addTranscript: (val) => set({ data: val }),
	deleteTranscript: (val) => {
		const newData = get().data.filter((_, index) => index !== val);
		set({ data: newData });
	},
}));
