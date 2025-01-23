import rootReducer from "../state/reducers";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

const middleware: Middleware[] = [];

if (process.env.NODE_ENV === "development") {
	middleware.push(logger);
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleware),
	devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
