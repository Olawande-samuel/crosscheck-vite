import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import router from "./routes/index.tsx";
import store from "./store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GG_APP_ID}>
					<RouterProvider router={router} />
				</GoogleOAuthProvider>
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
