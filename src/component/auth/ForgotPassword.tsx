import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../asset/CrossCheckLogo.png";

import {
	forgotPassword,
	setLoading,
	setLoginError,
} from "../../state/actions/users";
import axios from "axios";
import { RootState } from "../../store";

const ForgotPassword = () => {
	const [success, setSucces] = useState(false);
	const { loginError, loading } = useSelector((state:RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(dispatch(setLoginError("")));
		};
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
		},

		onSubmit: async (values) => {
			dispatch(setLoginError(""));
			dispatch(setLoading(true));
			try {
				await forgotPassword(values);

				setSucces(true);
				dispatch(setLoading(false));
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.data?.message) {
					if (
						err.response.data.message &&
						err.response.data.message === "user not found"
					) {
						dispatch(setLoginError("No account found"));
					}
				}
				dispatch(setLoading(false));
			}
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required("email is required"),
			//   }),
		}),
	});
	return (
		<div className="forgot-password">
			<form>
				{success ? (
					<>
						<p className="forgot-password-content">
							Check your inbox for the next steps. If you don't receive an
							email, and it's not in your spam folder this could mean you signed
							up with a different address.
						</p>
						<p className="has-account">
							Have an account?
							<Link
								to="/login"
								style={{ color: "#0092e0", textDecoration: "none" }}
							>
								Login
							</Link>
						</p>
					</>
				) : (
					<Div>
						<img src={Logo} alt="CrossCheck" className="forgot-pass-img" />
						<h3 style={{ textAlign: "center" }}>
							Having troubles with your password?
						</h3>
						{loginError.length > 0 && (
							<p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
						)}
						<p className="enter-email">
							Please enter the email address with which you registered, and
							we’ll send you an email with further instructions.
						</p>
						<div
							className="password-input fields"
							style={{ marginTop: "10px" }}
						>
							<input
								type="text"
								style={{ fontWeight: "bold" }}
								className="forgot-pass-input"
								name="email"
								id="email"
								placeholder="Enter email address"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="passw-error">{formik.errors.email}</div>
							) : null}
						</div>
						<button
							type="button"
							className="submit-button"
							onClick={() => formik.handleSubmit()}
							style={{ fontSize: "14px" }}
						>
							{loading ? "Requesting..." : "SUBMIT"}
						</button>
						<div className="reset-create">
							{/* <p>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#0092e0" }}
                >
                  Login to your account
                </Link>
              </p>
              <p style={{ color: "#0092e0" }}>Home</p> */}
							<p style={{ width: "100%" }}>
								If you are having problems recovering your password{" "}
								<Link to="/" className="cntct">
									contact us
								</Link>
								, or go{" "}
								<Link to="/" className="cntct">
									Home
								</Link>
								.
							</p>
						</div>
					</Div>
				)}
			</form>
		</div>
	);
};

export default ForgotPassword;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h3 {
		font-family: "poppins";
		letter-spacing: 0px;
		color: #707070;
		opacity: 1;
		font-size: 24px;
	}
	.enter-email {
		width: 80%;
		font-family: "poppins";
		text-align: center;
		letter-spacing: 0.4px;
		color: #707070;
		opacity: 1;
		font-size: 14px;
		font-weight: normal;
		@media (max-width: 400px) {
			width: 100%;
			font-size: 14px;
		}
	}
	.password-input {
		display: flex;
		justify-content: center;
		width: 100%;
		input {
			outline: 0;
			height: 40px;
			width: 80%;
			margin: 0 auto;
			border: 2px solid #70707061;
			border-radius: 35px;
			padding-left: 20px;
			font-family: "poppins";
			font-style: italic;
			letter-spacing: 0.32px;
			color: #707070;
			opacity: 1;
			@media (max-width: 400px) {
				font-size: 16px;
			}
		}
		.passw-error {
			color: red;
			font-size: 14;
			text-align: center;
		}
	}
	.submit-button {
		outline: 0;
		height: 40px;
		border-radius: 15px;
		width: 350px;
		margin-top: 25px;
		background: #0092e0 0% 0% no-repeat padding-box;
		border: 2px solid #0092e0;
		border-radius: 35px;
		font-weight: bold;
		letter-spacing: 0.32px;
		color: #ffffff;
		opacity: 1;
		cursor: pointer;
		@media (max-width: 400px) {
			margin-top: 0 !important;
			width: 200px;
		}
	}
	.reset-create {
		font-family: "poppins";
		letter-spacing: 0.4px;
		opacity: 1;
		text-align: center;
	}
`;
