import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
import { Button } from "@/components/ui/button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { FacebookIcon } from "lucide-react";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import crosscheckTm from "../../asset/crosscheckTm.svg";
import {
	login,
	setLoading,
	setLoginError,
	setUser,
} from "../../state/actions/users";
import { RootState } from "../../state/reducers";
import "./auth.css";
import { loginValidation } from "./Validation";

function Login() {
	const [visibility, setVisibility] = useState(false);
	const [remember, setRemember] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { loginError, loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		return () => {
			dispatch(dispatch(setLoginError("")));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},

		onSubmit: async (values) => {
			dispatch(setLoading(true));
			dispatch(setLoginError(""));
			try {
				const res = await login(values);

				if (res.data.message && res.data.message === "Logged in successfully") {
					dispatch(setUser(res.data.user));
					localStorage.setItem("crosscheckuser", JSON.stringify(res.data.user));
					formik.resetForm();

					// window.location.href = `/dashboard/${res.data.user.id}`;
					navigate(`/dashboard/${res.data.user.id}`);
				}
				dispatch(setLoading(false));
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.data?.message) {
					if (err.response.data.message === "invalid email or password") {
						dispatch(setLoginError("Invalid email or password"));
					} else if (err.response.data.message === "Account not activated") {
						toast.error("Account not activated");
					}
				} else {
					console.error("Unexpected error:", err);
				}
				dispatch(setLoading(false));
			}
		},
		validationSchema: loginValidation,
	});
	// const responseGoogle = (response) => {
	// 	console.log("HIIIIII");
	// 	axios({
	// 		method: "POST",
	// 		url: `${BASE_URL}/api/v1/users/googlelogin`,
	// 		data: { tokenId: response.tokenId },
	// 	})
	// 		.then((response) => {
	// 			localStorage.setItem(
	// 				"crosscheckuser",
	// 				JSON.stringify(response.data.user)
	// 			);
	// 			window.location.href = `/dashboard/${response.data.user.id}`;
	// 		})
	// 		.catch((err) => {
	// 			if (
	// 				err.response.data.message ===
	// 				"No account associated with this google account"
	// 			) {
	// 				return toast.error("No account associated with gmail account");
	// 			}
	// 		});
	// };

	// const responseFacebook = (response: any) => {
	// 	axios({
	// 		method: "POST",
	// 		url: `${BASE_URL}/api/v1/users/facebooklogin`,
	// 		data: { accessToken: response.accessToken, userID: response.userID },
	// 	}).then((response) => {
	// 		localStorage.setItem(
	// 			"crosscheckuser",
	// 			JSON.stringify(response.data.user)
	// 		);
	// 		window.location.href = `/dashboard/${response.data.user.id}`;
	// 	});
	// };

	return (
		<div className="flex flex-col min-h-screen relative">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="py-4 px-[30px] bg-white border-b border-[#eaeaea] sticky top-0 z-20">
				<img
					className="crosschecklogo"
					src={crosscheckTm}
					alt="logo"
					width={150}
					height={30}
				/>
			</div>
			<div className="flex-1 w-full flex flex-col xl:flex-row">
				<div className="xl:basis-[40%] bg-white flex-1">
					<div className="form-section size-full  mx-auto">
						<div className="form-wrapper login-wrapper mx-auto max-w-[600px] xl:max-w-[33vw]">
							<form className="form-surround" onSubmit={formik.handleSubmit}>
								<div className="info-container">
									<h3 className="great mb-4 font-semibold ">
										Great to See you again
									</h3>
									<p
										style={{
											fontSize: "14px",
											fontFamily: "poppins",
											color: "#707070",
										}}
										className="mb-3"
									>
										Sign in to your account
									</p>
									{loginError.length > 0 && (
										<p style={{ color: "red" }}>{loginError}</p>
									)}
								</div>

								<div className="email-input fields">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										id="email"
										className="input logininput px-3"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.email && formik.errors.email ? (
										<div className="error">{formik.errors.email}</div>
									) : null}
								</div>

								<div
									className="password-input fields"
									style={{ position: "relative" }}
								>
									<label>Enter password</label>

									<input
										type={!visibility ? "password" : "text"}
										name="password"
										id="password"
										className="input passwordinput px-3"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{!visibility ? (
										<FontAwesomeIcon
											icon={faEyeSlash}
											className="visible-icon"
											onClick={() => setVisibility(!visibility)}
										/>
									) : (
										<FontAwesomeIcon
											icon={faEye}
											className="visible-icon"
											onClick={() => setVisibility(!visibility)}
										/>
									)}
									{formik.touched.password && formik.errors.password ? (
										<div className="error">{formik.errors.password}</div>
									) : null}
								</div>
								<button type="submit" className="register-button loginbtn">
									{loading ? "Signing in..." : "LOGIN"}
								</button>

								<div
									className="terms"
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div className="flex items-center gap-1 flex-wrap">
										<input
											type="checkbox"
											name="remember"
											id="remember"
											className="border border-gray-400 accent-[#0092e0]"
											checked={remember}
											onChange={() => setRemember(!remember)}
										/>
										<label htmlFor="remember" className="mb-0">
											Remember me
										</label>
									</div>

									<Link to="/forgotpassword">Forgot password?</Link>
								</div>
								<div
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									{/* <p className="signup-with">Login with</p> */}

									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											marginTop: "15px",
										}}
										className="flex gap-4 flex-wrap"
									>
										<FacebookProvider
											appId={import.meta.env.VITE_APP_FB_APP_ID}
										>
											<LoginButton>
												<Button className="bg-[#0092e0] text-white flex justify-center items-center gap-1">
													<FacebookIcon />
													Login with Facebook
												</Button>
											</LoginButton>
										</FacebookProvider>
										<GoogleLogin
											onSuccess={(credentialResponse) => {
												console.log(credentialResponse);
											}}
											onError={() => {
												console.log("Login Failed");
											}}
										/>
									</div>
									<p className="paragraph">
										Don't have an account?
										<Link
											to="/register"
											style={{
												textDecoration: "none",
												color: "#0092e0",
											}}
										>
											&nbsp; Create One Here
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="bg-[url('/ManHiRes1.jpg')] bg-no-repeat bg-cover hidden xl:block basis-[60%]"></div>
			</div>
		</div>
	);
}

export default Login;
