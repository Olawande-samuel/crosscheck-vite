import * as types from "../actionTypes/users";

const initialState = {
	loading: false,
	registerError: "",
	loginError: "",
	user: {},
	location: "",
};
interface SetLoadingAction {
	type: typeof types.SET_LOADING;
	payload: boolean;
}

interface SetErrorAction {
	type: typeof types.SET_ERROR;
	payload: string;
}

interface LoginErrorAction {
	type: typeof types.LOGIN_ERROR;
	payload: string;
}

interface SetUserAction {
	type: typeof types.SET_USER;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: { [key: string]: any };
}

type UserAction =
	| SetLoadingAction
	| SetErrorAction
	| LoginErrorAction
	| SetUserAction;

export default function userReducer(state = initialState, action: UserAction) {
	switch (action.type) {
		case types.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case types.SET_ERROR:
			return {
				...state,
				registerError: action.payload,
			};

		case types.LOGIN_ERROR:
			return {
				...state,
				registerError: "",
				loginError: action.payload,
			};
		case types.SET_USER:
			return {
				...state,
				user: action.payload,
				registerError: "",
				loginError: "",
			};

		default:
			return state;
	}
}
