import { combineReducers } from "redux";
import user from "./users";
import institutions from "./institutions";
import verifications from "./verifications";

const rootReducer = combineReducers({
	user,
	institutions,
	verifications,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
