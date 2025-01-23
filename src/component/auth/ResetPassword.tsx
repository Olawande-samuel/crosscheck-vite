import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import Logo from "../../asset/CrossCheckLogo.png";
import {
	resetPassword,
	setLoading,
	setLoginError,
} from "../../state/actions/users";
import * as Yup from "yup";
import axios from "axios";

function ResetPassword() {
	const [passwordToken, setPasswordToken] = useState("");

	const dispatch = useDispatch();
	const { token } = useParams();
	useEffect(() => {
		if (token) {
			setPasswordToken(token);
		}
	}, [token]);

	useEffect(() => {
		return () => {
			dispatch(setLoginError(""));
			dispatch(setLoading(false));
		};
	}, []);
	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},

		onSubmit: async (values) => {
			dispatch(setLoading(true));
			try {
				const res = await resetPassword(passwordToken, values);

				if (res.status === 200) {
					dispatch(setLoading(false));
					formik.resetForm();
					return toast.success("Password reset successful");
				}
			} catch (err) {
        dispatch(setLoading(false));
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          if (
            err?.response?.data.message ===
            "Password reset token is invalid or has expired."
          ) {
            return toast.error("Password reset token is invalid or has expired");
          } else {
            toast.error("An error occured");
          }
        
        }
			}
		},
		validationSchema: Yup.object({
			newPassword: Yup.string().required("Enter password"),
			confirmPassword: Yup.string()
				.required("Re-enter password")
				.test("passwords-match", "Passwords must match", function (value) {
					return this.parent.newPassword === value;
				}),
		}),
	});
	return (
		<div className="forgot-password">
			<ToastContainer
				position="top-right"
				autoClose={10000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				style={{ marginTop: "20px" }}
			/>
			<form>
				<Div>
					<img src={Logo} alt="CrossCheck" className="forgot-pass-img" />
					<h3 style={{ textAlign: "center" }}>Create a New Password</h3>
					<div className="password-input fields">
						<label className="pass-label" htmlFor="email">
							New Password
						</label>
						<input
							type="text"
							className="forgot-pass-input"
							name="newPassword"
							id="newPassword"
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>{" "}
						{formik.touched.newPassword && formik.errors.newPassword ? (
							<div className="passw-error">Enter password</div>
						) : null}
					</div>
					<div className="password-input fields">
						<label className="confirm-label" htmlFor="email">
							Confirm Password
						</label>
						<input
							type="text"
							className="forgot-pass-input"
							name="confirmPassword"
							id="confirmPassword"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
							<div className="passw-error">{formik.errors.confirmPassword}</div>
						) : null}
					</div>
					<button
						type="button"
						className="submit-button"
						onClick={() =>formik.handleSubmit()}
					>
						RESET PASSWORD
					</button>

					<div className="recover-pass">
						<p>
							If you are having problems recovering your password
							<Link
								to="/register"
								style={{ textDecoration: "none", color: "#0092e0" }}
							>
								<br />
								contact us
							</Link>
							&nbsp; or go
							<Link to="/" style={{ textDecoration: "none", color: "#0092e0" }}>
								&nbsp; Home
							</Link>
						</p>
					</div>
				</Div>
			</form>
		</div>
	);
}

export default ResetPassword;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h3 {
		font-family: "poppins";
		letter-spacing: 0px;
		font-weight: bold;
		color: #707070;
		opacity: 1;
		@media (max-width: 400px) {
			font-size: 28px;
		}
	}
	.recover-pass {
		p {
			text-align: center;
			letter-spacing: 0.32px;
			color: #707070;
			font-family: "poppins";
			opacity: 1;
			font-weight: lighter;
			font-size: 10px;
			@media (max-width: 500px) {
				width: 100%;
				font-size: 14px;
			}
		}
	}
	.enter-email {
		width: 80%;
		text-align: center;
		font: normal normal normal 12px "poppins";
		letter-spacing: 0.4px;
		color: #707070;
		opacity: 0.8;
	}
	.password-input {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-bottom: 20px;
		.pass-label,
		.confirm-label {
			font-weight: bold !important;
			margin-left: 15px;
			font-family: "poppins";
			font-weight: bold;
			letter-spacing: 0px;
			color: #707070;
			opacity: 1;
			@media (max-width: 500px) {
				margin-left: 35px;
			}
		}
		input {
			outline: 0;
			height: 40px;
			width: 100%;
			margin: 0 auto;
			margin-bottom: 0;
			border: 2px solid #70707061;
			border-radius: 35px;
			padding-left: 20px;
			@media (max-width: 400px) {
				font-size: 16px;
				height: 34px;
				width: 80%;
			}
			@media (max-width: 500px) {
				font-size: 16px;
				height: 35px;
				width: 80%;
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
		margin: 0 auto;
		width: 350px;
		margin-top: 10px;
		background: #0092e0 0% 0% no-repeat padding-box;
		border: 2px solid #0092e0;
		border-radius: 35px;
		font-family: "poppins";
		font-weight: bold;
		letter-spacing: 0.32px;
		color: #ffffff;
		text-transform: uppercase;
		opacity: 1;
		font-weight: bold;
		cursor: pointer;
		padding-top: 10px;
		padding-bottom: 10px;
		@media (max-width: 400px) {
			height: 40px;
			font-size: 12px;
			width: 200px;
		}
		@media (max-width: 500px) {
			height: 40px;
			font-size: 12px;
			width: 200px;
		}
	}
`;
