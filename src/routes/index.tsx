import { createBrowserRouter } from "react-router";
import LandingPage from "../component/LandingPage";
import Register from "../component/auth/Register";
import Login from "../component/auth/Login";
import Terms from "../component/Terms";
import AuthCheckedUserLayout from "../component/dashboard/ProtectedLayoutIndex";
import MainContent from "../component/dashboard/MainContent";
import NewTranscript from "../component/dashboard/NewTranscript";
import NewVerifications from "../component/dashboard/NewVerifications";
import VerificationHistory from "../component/dashboard/VerificationHistory";
import Receipts from "../component/dashboard/Receipts";
import AccountVerification from "../component/auth/AccountVerification";
import ForgotPassword from "../component/auth/ForgotPassword";
import ResetPassword from "../component/auth/ResetPassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "terms",
		element: <Terms />,
	},
	{
		path: "users/verify",
		element: <AccountVerification />,
	},
	{
		path: "forgotpassword",
		element: <ForgotPassword />,
	},
	{
		path: "reset/:token",
		element: <ResetPassword />,
	},
	{
		path: "dashboard",
		element: <AuthCheckedUserLayout />,
		children: [
			{
				index: true,
				element: <MainContent />,
			},
			{
				path: ":id",
				element: <MainContent />,
			},
			{
				path: "transcript",
				element: <NewTranscript />,
			},
			{
				path: "new",
				element: <NewVerifications />,
			},
			{
				path: "history",
				element: <VerificationHistory />,
			},
			{
				path: "receipts",
				element: <Receipts />,
			},
		],
	},
]);

export default router;
