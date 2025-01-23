import * as types from "../actionTypes/users";
import {
	GET_PAGE_DETAILS,
	LOADING,
	NO_INSTITUTES,
} from "../actionTypes/verifications";

interface PageInfo {
	totalDocs: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	page: number;
}
interface InstitutionsState {
	institutions: InstitutionProps[];
	pageInfo: PageInfo;
	loading: boolean;
	noInstitutes: boolean;
}

const initialState: InstitutionsState = {
	institutions: [],
	pageInfo: {
		totalDocs: 0,
		totalPages: 0,
		hasPrevPage: false,
		hasNextPage: false,
		page: 0,
	},
	loading: false,
	noInstitutes: false,
};

type InstitutionsAction = {
	type:
		| typeof types.FETCH_INSTITUTIONS
		| typeof GET_PAGE_DETAILS
		| typeof LOADING
		| typeof NO_INSTITUTES;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
};

export default function userReducer(
	state = initialState,
	action: InstitutionsAction
) {
	switch (action.type) {
		case types.FETCH_INSTITUTIONS:
			return {
				...state,
				institutions: action.payload,
			};
		case GET_PAGE_DETAILS:
			return {
				...state,
				pageInfo: action.payload,
			};
		case LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case NO_INSTITUTES:
			return {
				...state,
				noInstitutes: action.payload,
			};
		default:
			return state;
	}
}
