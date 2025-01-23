import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import crosscheckTm from "../../asset/crosscheckTm.svg";
import "./auth.css";

import { AxiosError } from "axios";
import useUserLocation from "../../hooks/useUserLocation";
import {
	setLoading,
	setLoginError,
	setRegisterError,
	signUp,
} from "../../state/actions/users";
import { RootState } from "../../state/reducers";
import { signUpValidation } from "./Validation";

export interface SignUpFormValues {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	accountType: string;
	password: string;
	country: string;
	companyWebsite: string;
	organizationName: string;
	accept: boolean;
	[key: string]: string | boolean; // Index signature
}

interface ErrorResponse {
	message: string;
	// Add other properties if needed
}

function Register() {
	const [visibility, setVisibility] = useState(false);
	const [success, setSuccess] = useState(false);
	const [countrySelected, setCountrySelected] = useState("us");
	const [userEmail, setUserEmail] = useState("");
	const dispatch = useDispatch();

	const { registerError, loading } = useSelector(
		(state: RootState) => state.user
	);

	// useEffect(() => {
	// 	ipapi.location(
	// 		(loca) => {
	// 			setCountrySelected(loca.toLowerCase());
	// 		},
	// 		"",
	// 		"",
	// 		"country"
	// 	);
	// }, []);

	const userCountry = useUserLocation();

	useEffect(() => {
		if (userCountry) {
			formik.setFieldValue("country", userCountry);
			setCountrySelected(userCountry.toLowerCase());
		}
	}, [userCountry]);

	const formik = useFormik<SignUpFormValues>({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			accountType: "",
			password: "",
			country: "",
			companyWebsite: "",
			organizationName: "",
			accept: false,
		},

		onSubmit: async (values) => {
			console.log(values);
			for (const propName in values) {
				if (
					values[propName] === null ||
					values[propName] === undefined ||
					values[propName] === "" ||
					values[propName] === true
				) {
					delete values[propName];
				}
			}

			dispatch(setLoading(true));
			dispatch(setRegisterError(""));
			try {
				const res = await signUp(values);
				formik.resetForm();
				if (
					res.data.message === "Please check your email for an activation link"
				) {
					setSuccess(true);
					setUserEmail(values.email);
				}
				dispatch(setLoading(false));

				// window.location.href = "/login";
			} catch (err) {
				const error = err as AxiosError;
				const errorMessage = error.response?.data as ErrorResponse;

				if (
					errorMessage.message &&
					errorMessage.message === "user already exist"
				) {
					dispatch(setRegisterError("Email already exist"));
				}
				dispatch(setLoading(false));
			}
		},
		validationSchema: signUpValidation,
	});

	return (
		<div className="flex flex-col min-h-screen relative">
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
					{success ? (
						<div className="bg-white size-full  h-screen mx-auto">
							<div className="shadow-md flex flex-col items-center h-fit rounded-[15px] mx-auto  max-w-[600px] p-4 md:p-6">
								<h3 className=" text-[#0092e0] text-xl font-['poppins'] mb-4 font-semibold">
									Account created successfully
								</h3>
								<p className="text-center tracking-[0.44px] p-[10px] text-[#173049]">
									We've sent an account activation link to
									<br />
									<span className="font-extrabold">
										{userEmail}. Please check your inbox, spam or promotions
										folder.
									</span>{" "}
								</p>

								<p className="text-center">
									Click on the link to activate your account
								</p>
								{/* <button> */}
								<Link
									className="w-[70%] text-white text-center bg-[#0092e0] rounded-[13px] border border-[#0092e0] cursor-pointer mt-5 py-[10px] font-bold"
									to="/login"
									onClick={() => dispatch(setLoginError(""))}
								>
									Login
								</Link>
								{/* </button> */}
							</div>
						</div>
					) : (
						<div className="form-section size-full  mx-auto">
							<div className="form-wrapper mx-auto max-w-[600px] xl:max-w-[33vw]">
								<form className="form-surround" onSubmit={formik.handleSubmit}>
									<h5 className="text-header mb-8 font-semibold">
										Create An Account
									</h5>

									{registerError.length > 0 && (
										<p className="error exist">{registerError}</p>
									)}

									<div className="name-section fields">
										<div className="firstname-input">
											<label htmlFor="firstName">First Name</label>
											<input
												type="text"
												name="firstName"
												id="firstName"
												className="input px-2 py-1 !h-auto"
												value={formik.values.firstName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.firstName && formik.errors.firstName ? (
												<div className="error">{formik.errors.firstName}</div>
											) : null}
										</div>
										<div className="lastname-input ">
											<label htmlFor="lastName">Last Name</label>
											<input
												type="text"
												name="lastName"
												id="lastName"
												className="input px-2 py-1 !h-auto"
												value={formik.values.lastName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.lastName && formik.errors.lastName ? (
												<div className="error">{formik.errors.lastName}</div>
											) : null}
										</div>
									</div>
									<div className="email-input fields">
										<label htmlFor="email">Email</label>
										<input
											type="email"
											name="email"
											id="email"
											className="input px-2 py-1 !h-auto"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.email && formik.errors.email ? (
											<div className="error">{formik.errors.email}</div>
										) : null}
									</div>
									<div className="country-phone fields">
										<div className="country-input acctype">
											<label htmlFor="email">Is this an</label>
											<select
												name="accountType"
												id="accountType"
												className="input px-2 py-1 !h-auto"
												value={formik.values.accountType}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											>
												<option value="" disabled selected>
													Select an Option
												</option>
												<option value="individual">Individual</option>
												<option value="organization">Organization</option>
											</select>
											{formik.touched.accountType &&
											formik.errors.accountType ? (
												<div className="error">{formik.errors.accountType}</div>
											) : null}
										</div>
										{formik.values.accountType === "organization" && (
											<div className="phone">
												<label htmlFor="email">Company Name</label>
												<input
													type="text"
													name="organizationName"
													id="organizationName"
													className="input px-2 py-1 !h-auto"
													value={formik.values.organizationName}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
												{formik.touched.organizationName &&
												formik.errors.organizationName ? (
													<div className="error">
														{formik.errors.organizationName}
													</div>
												) : null}
											</div>
										)}
									</div>
									<div className="country-phone fields">
										<div className="country-input">
											<label htmlFor="country">Country</label>
											<CountryDropdown
												name="country"
												id="country"
												classes="country px-2 py-1"
												valueType="short"
												value={formik.values.country}
												onChange={(val, e) => {
													formik.handleChange(e);
													setCountrySelected(val.toLowerCase());
												}}
												onBlur={formik.handleBlur}
											/>

											{formik.touched.country && formik.errors.country ? (
												<div className="error">{formik.errors.country}</div>
											) : null}
										</div>
										<div className="phone">
											<label htmlFor="phone">Phone Number</label>
											<PhoneInput
												country={countrySelected}
												// type="text"
												// name="phone"
												// id="phone"
												// className="react-phone"

												value={formik.values.phone}
												onChange={(e) => {
													formik.setFieldValue("phone", e);
												}}
												onBlur={formik.handleBlur}
												searchPlaceholder=""
											/>
											{formik.touched.phone && formik.errors.phone ? (
												<div className="error">{formik.errors.phone}</div>
											) : null}
										</div>
									</div>
									<div
										className="password-input fields"
										style={{ position: "relative" }}
									>
										<label>Enter password</label>

										<input
											name="password"
											id="password"
											type={!visibility ? "password" : "text"}
											className="input px-2 py-1 !h-auto"
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{!visibility ? (
											<FontAwesomeIcon
												icon={faEyeSlash}
												className="custom-icon"
												onClick={() => setVisibility(!visibility)}
											/>
										) : (
											<FontAwesomeIcon
												icon={faEye}
												className="custom-icon"
												onClick={() => setVisibility(!visibility)}
											/>
										)}
										{formik.touched.password && formik.errors.password ? (
											<div className="error">{formik.errors.password}</div>
										) : null}
									</div>

									{formik.values.accountType === "organization" && (
										<div
											className="password-input fields"
											style={{ marginTop: "15px" }}
										>
											<label>Company's website</label>

											<input
												type="text"
												className="input px-2 py-1 !h-auto"
												name="companyWebsite"
												id="companyWebsite"
												value={formik.values.companyWebsite}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.companyWebsite &&
											formik.errors.companyWebsite ? (
												<div className="error">
													{formik.errors.companyWebsite}
												</div>
											) : null}
										</div>
									)}
									<div className="terms mb-4">
										<div
											className="accept flex items-center gap-2"
											// onClick={() => {
											// 	formik.setFieldValue("accept", !formik.values.accept);
											// }}
										>
											{/* <div
											className="agree-box"
											style={{
												background: formik.values.accept ? "#0092e0" : "",
												borderColor: formik.values.accept
													? "#0092e0"
													: "#e2e2e2",
											}}
										>
											{formik.values.accept && <Check />}
										</div> */}
											<input
												type="checkbox"
												name="accept"
												id="accept"
												onChange={formik.handleChange}
												checked={formik.values.accept}
												className="p-3 size-4 rounded-3xl"
											/>
											<label htmlFor="accept" className="mb-0">
												I agree to the{" "}
												<a
													href="/terms"
													target="_blank"
													rel="noopener noreferrer"
													style={{ color: "rgb(0, 146, 224)" }}
													onClick={(e) => e.stopPropagation()}
												>
													terms and conditions
												</a>
											</label>
										</div>
										{formik.touched.accept && formik.errors.accept ? (
											<div className="error" style={{ textAlign: "center" }}>
												{formik.errors.accept}
											</div>
										) : null}
									</div>
									<button
										type="submit"
										className="register-button"
										// onClick={formik.handleSubmit}
									>
										{loading ? "CREATING..." : "REGISTER"}
									</button>

									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<p className="paragraph">
											Already have an account? &nbsp;
											<Link
												style={{ color: "#0092e0", textDecoration: "none" }}
												to="/login"
											>
												Login here
											</Link>
										</p>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
				<div className="bg-[url('/ManHiRes1.jpg')] bg-no-repeat bg-cover hidden xl:block basis-[60%]"></div>
			</div>
		</div>
	);
}

export default Register;
