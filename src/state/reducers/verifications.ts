/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from "../actionTypes/verifications";
interface Verification {
	id: string;
}
interface State {
	verifications: Verification[];
	schCard: boolean;
	selectedInstitution: any;
	userVerifications: any[];
	transcript: any[];
	newTranscript: any[];
	messages: any[];
}
const initialState: State = {
	verifications: [],
	schCard: false,
	selectedInstitution: {},
	userVerifications: [],
	transcript: [],
	newTranscript: [],
	messages: [],
};

interface Action<T = any> {
	type: string;
	payload?: T;
}
export default function userReducer(state = initialState, action: Action) {
	switch (action.type) {
		case types.ADD_VERIFICATIONS:
			return {
				...state,
				verifications: [...action.payload],
			};
		case types.SELECT_SCHOOL:
			return {
				...state,
				selectedInstitution: action.payload,
			};
		case types.USER_VERIFICATIONS:
			return {
				...state,
				userVerifications: action.payload,
			};
		case types.ADD_TRANSCRIPT:
			return {
				...state,
				transcript: [...action.payload],
			};

		case types.DELETE_VERIFICATION:
			return {
				...state,
				verifications: state.verifications.filter(
					(v) => v.id !== action.payload
				),
			};
		case types.GET_TRANSCRIPT:
			return {
				...state,
				newTranscript: [...action.payload],
			};
		case types.GET_MESSAGES:
			return {
				...state,
				messages: [...action.payload],
			};
		default:
			return state;
	}
}
