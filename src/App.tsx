import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import MainContent from "./component/dashboard/MainContent";
import AuthCheckedUserLayout from "./component/dashboard/ProtectedLayoutIndex";
import LandingPage from "./component/LandingPage";
import Terms from "./component/Terms";

function App() {
	return (
		<Routes>
			<Route index element={<LandingPage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/terms" element={<Terms />} />

			<Route element={<AuthCheckedUserLayout />}>
				<Route path="/dashboard/:id" element={<MainContent />} />
				<Route path="*" element={<div>Route not found</div>} />
			</Route>
			{/* <Route path="/verify/:email" element={AccountVerification} />
				<Route path="/forgotpassword" element={ForgotPassword} />
				<Route path="/reset/:token" element={ResetPassword} />
				<Route
					path="/new"
					element={(props) => withAuthCheck(MainContent, props)}
				/>
				<Route
					path="/transcript"
					element={(props) => withAuthCheck(MainContent, props)}
				/>
				<Route
					path="/history"
					element={(props) => withAuthCheck(MainContent, props)}
				/>
				<Route
					path="/receipts"
					element={(props) => withAuthCheck(MainContent, props)}
				/>
				<Route path="/" element={LandingPage} />
				<Route path="/terms" element={Terms} />
				<Route path="/active" element={EmailActivation} />
				<Route element={NotFound} /> */}
		</Routes>
	);
}

export default App;
