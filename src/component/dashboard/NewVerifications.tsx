import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBlocker, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import arrow from "../../asset/arrow-right.svg";
import Logo from "../../asset/CrossCheckLogo.png";
import { selectSchool } from "../../state/actions/verifications";
import Layout from "./DashboardLayout";
import "./ver.css";
import VerificationForm from "./VerificationForm";

import { AddVerificationPayload } from "@/state/actions/action_types";
import { useVerificationStore } from "@/store/useVerificationStore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { FieldArray, Form, Formik } from "formik";
import generatePDF from "react-to-pdf";
import useFlutterwaveConfig from "../../hooks/useFlutterwaveConfig";
import useUser from "../../hooks/useUser";
import useUserLocation from "../../hooks/useUserLocation";
import { BASE_URL } from "../../state/constant/constants";
import { RootState } from "../../store";
import ActivitySteps from "./ActivitySteps";
import { cn, toDollar } from "./utils";

export type FormValues = Omit<
	AddVerificationPayload,
	"ourCharge" | "instituteCharge" | "certImage" | "date" | "email"
>;

const request = (data: FormValues, token: string) => {
	const formData = new FormData();
	Object.keys(data).forEach((key) => {
		const value = data[key as keyof FormValues];
		if (typeof value === "boolean") {
			formData.append(key, String(value));
		}
		formData.append(key, value);
	});
	axios({
		data: formData,
		method: "post",
		url: `${BASE_URL}/api/v1/verifications/request`,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,
		},
	});
};

const NewVerifications = () => {
	const dispatch = useDispatch();
	const [isBlocking] = useState(true);
	const blocker = useBlocker(isBlocking);
	const targetRef = useRef<HTMLDivElement | null>(null);
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();
	const splitDate = `${month}-${day}-${year}`;
	const user = useUser();
	const { selectedInstitution } = useSelector(
		(state: RootState) => state.verifications
	);

	const formData = {
		firstName: "",
		institution: selectedInstitution?.name || "",
		lastName: "",
		middleName: "",
		dateOfBirth: "",
		studentId: "",
		course: "",
		qualification: "",
		classification: "",
		admissionYear: "",
		graduationYear: "",
		enrollmentStatus: false,
		requester: "",
	};

	const {
		data: verifications,
		deleteVerification,
		addVerification,
	} = useVerificationStore();

	const [requestList, setRequestList] = useState(false);
	const [checked, setChecked] = useState(false);
	const userCountry = useUserLocation();
	const [current, setCurrent] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		if (blocker.state === "blocked") {
			const confirmed = window.confirm(
				`Are you sure you want to go to ${location.pathname}`
			);
			if (confirmed) {
				blocker.proceed();
			} else {
				blocker.reset();
			}
		}
	}, [blocker, location]);

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
	};

	const processPayment = async () => {
		try {
			await Promise.allSettled(
				verifications.map((value) => request(value, user?.token ?? ""))
			);
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		} finally {
			setTimeout(() => {
				navigate(`/dashboard/${user?.id}`);
			}, 1500);
		}
	};

	const totalOurCharge = verifications?.reduce(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(accumulator: any, currentValue: any) =>
			accumulator +
			Number(
				userCountry === "NG"
					? currentValue["ourCharge"]
					: toDollar(currentValue["ourCharge"])
			),
		0
	);

	const totalInstituteCharge = verifications?.reduce(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(accumulator: any, currentValue: any) =>
			accumulator +
			Number(
				userCountry === "NG"
					? currentValue["instituteCharge"]
					: toDollar(currentValue["instituteCharge"])
			),
		0
	);
	const total =
		(totalOurCharge ? totalOurCharge : 0) +
		(totalInstituteCharge ? totalInstituteCharge : 0);

	function paymentSuccessCallback() {
		closePaymentModal(); // this will close the modal programmatically
		processPayment();
		addVerification([]);
		setRequestList(false);
		dispatch(selectSchool({}));
		toast.success("request submitted");
	}
	const fwConfig = useFlutterwaveConfig({
		total,
		userCountry,
		cb: paymentSuccessCallback,
	});

	const verify = async (formValues: FormValues[]) => {
		for (let i = 0; i < formValues.length; i++) {
			for (const property in formValues[i]) {
				if (
					property in formValues[i] &&
					formValues[i][property as keyof FormValues] === ""
				) {
					return toast.error(`Please fill all fields and submit details`);
				}
			}
		}
		const data = formValues as unknown as AddVerificationPayload[];
		addVerification(data);
		setCurrent(3);
		setRequestList(true);
	};

	return (
		<Formik
			initialValues={{ formValues: [{ ...formData }] }}
			onSubmit={(values) => {
				verify(values.formValues);
			}}
		>
			<Form>
				<FieldArray name="formValues">
					{({ remove }) => (
						<Layout>
							<VerificationBody>
								<ToastContainer
									position="bottom-right"
									autoClose={5000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
									style={{ marginTop: "20px" }}
								/>

								<div className={requestList ? "none" : ""}>
									<h2 className="new-heading my-[0.8em]">New Verification</h2>
									<p className="new-para">Education Verification</p>
								</div>
								<div className="mt-[15px] mb-5">
									<ActivitySteps activeStep={current} />
								</div>
								{!requestList && (
									<FieldArray
										name="formValues"
										render={({ push, remove, form }) => (
											<div>
												{form.values.formValues.map(
													(value: FormValues, index: number) => (
														<div key={index}>
															<VerificationForm
																verificationsLength={
																	form.values.formValues.length
																}
																initialValues={value}
																updateFormValues={(data) => {
																	form.setFieldValue(
																		`formValues.${index}`,
																		data
																	);
																}}
																deleteOneVerification={() => remove(index)}
															/>
														</div>
													)
												)}

												<button
													type="button"
													onClick={() => push({ ...formData })}
													className="add-new-btn"
												>
													Add New Verification <FontAwesomeIcon icon={faPlus} />
												</button>
											</div>
										)}
									/>
								)}
								<div className={requestList ? "none" : "bottom-button"}>
									<div className="line"></div>
									<div className="consent flex items-center pl-3">
										<input
											type="checkbox"
											value={String(checked)}
											name="checked"
											onChange={handleCheck}
											id="consent"
										/>
										<label htmlFor="consent" className="ml-2 mb-0">
											I hold the written consent of the individuals named above
											and have provided copies of these consents where
											requested.
										</label>
									</div>
									<button
										type="submit"
										className={cn(
											"bg-[#0092e0] text-white max-w-[200px] outline-none border border-[#0092e0] rounded-[17px] !font-['poppins'] flex items-center gap-2 justify-center py-2 disabled:!bg-gray-500 disabled:border-transparent disabled:text-gray-400",
											!checked && "cursor-not-allowed"
										)}
										disabled={!checked}
									>
										<img src={arrow} alt="right" />
										<span>Proceed to pay</span>
									</button>
								</div>
								{requestList && (
									<SelectSch>
										<div className="new-table invoice-table" ref={targetRef}>
											<div className="first-section">
												<div className="img-text">
													<img src={Logo} alt="" />
												</div>
												<h1>Invoice</h1>
											</div>
											<div className="second-section">
												<div className="customer">
													<strong style={{ fontSize: "20px" }}>
														Customer Details
													</strong>
													<p
														style={{
															margin: "0",
															color: "black",
															fontWeight: "500",
														}}
													>
														{user?.firstName} {user?.lastName}
													</p>
													{/* <p>{user?.organizationName || ""}</p> */}
												</div>
												<div className="invoice">
													<div className="date">
														<p>
															{" "}
															<strong>Invoice Date</strong>
														</p>
														<p>
															{" "}
															<strong>Amount</strong>
														</p>
													</div>
													<div className="info">
														<p>{splitDate}</p>
														{userCountry === "NG" ? (
															<p style={{ fontWeight: "bold" }}>
																&#8358;{total}
															</p>
														) : (
															<p style={{ fontWeight: "bold" }}>${total}</p>
														)}
													</div>
												</div>
											</div>
											<table
												cellSpacing="0"
												cellPadding="0"
												border={0}
												className="ideTable"
											>
												<thead className="table-headers">
													<tr>
														<th>Name</th>
														<th>Our Charge</th>
														<th>Institute Charge</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{verifications.length > 0 &&
														verifications.map(
															(ver: AddVerificationPayload, index: number) => {
																return (
																	<tr key={ver.institution + index}>
																		<th className="mobile-header">Number</th>
																		<td>{ver.institution}</td>
																		<th className="mobile-header">Weight</th>
																		{userCountry === "NG" ? (
																			<td>&#8358;{ver["ourCharge"]}</td>
																		) : (
																			<td>${toDollar(ver["ourCharge"])}</td>
																		)}
																		<th className="mobile-header">Value</th>
																		{userCountry === "NG" ? (
																			<td>&#8358;{ver["instituteCharge"]}</td>
																		) : (
																			<td>
																				${toDollar(ver["instituteCharge"])}
																			</td>
																		)}
																		<td>
																			<FontAwesomeIcon
																				icon={faTrash}
																				onClick={() => {
																					deleteVerification(index);
																					remove(index);
																				}}
																			/>
																		</td>
																	</tr>
																);
															}
														)}

													<td></td>

													<td style={{ color: "black", fontWeight: "bold" }}>
														TOTAL
													</td>
													{userCountry === "NG" ? (
														<td style={{ fontWeight: "bold" }}>
															&#8358;{total}
														</td>
													) : (
														<td style={{ fontWeight: "bold" }}>${total}</td>
													)}
													<td></td>
												</tbody>
											</table>
											<button
												style={{
													backgroundColor: "#0092e0",
													border: "none",
													padding: "0.8rem",
													color: "#ffffff",
													float: "right",
													marginRight: "1.5rem",
													borderRadius: "15px",
													outline: "none",
													cursor: "pointer",
												}}
												onClick={() =>
													generatePDF(targetRef, { filename: "page.pdf" })
												}
											>
												Print Invoice
											</button>
										</div>
										<div className="buttons">
											<button
												className="add-btn"
												onClick={() => setRequestList(false)}
											>
												<FontAwesomeIcon icon={faPlus} />
												Add another Verification &nbsp;{" "}
											</button>
											<FlutterWaveButton {...fwConfig} className="btn" />
										</div>
									</SelectSch>
								)}
							</VerificationBody>
						</Layout>
					)}
				</FieldArray>
			</Form>
		</Formik>
	);
};

export default NewVerifications;

const VerificationBody = styled.div`
	height: 100%;
	padding-left: 30px;
	overflow-y: scroll;
	padding-right: 30px;
	background: #fafafb;
	@media (max-width: 500px) {
		padding-right: 16px;
		padding-left: 16px;
	}
	.new-heading {
		font-family: "poppins";
		letter-spacing: 0px;
		color: #0092e0;
		opacity: 1;
		font-size: 32px;
		font-weight: lighter;
	}
	.new-para {
		font-family: "poppins";
		letter-spacing: 0.44px;
		color: #707070;
		opacity: 1;
	}
	.step-text {
		width: 64%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		font-size: 12px;
		margin-top: 20px;
		text-align: center;
		opacity: 1;
		font-family: "poppins";
		color: #707070;
		@media (max-width: 500px) {
			display: none;
		}
	}
	.none {
		display: none;
	}
	.bottom-button {
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #ffffff 0% 0% no-repeat padding-box;
		border-radius: 7px;
		box-shadow: 0px 0px 10px #00000029;
		padding-top: 30px;
		padding-bottom: 30px;
		font-family: "poppins";
		.line {
			border-bottom: 1px solid grey;
			width: 95%;
			margin-left: 40px;
			margin-bottom: 20px;
			margin-top: 10px;
			@media (max-width: 500px) {
				width: 90%;
				margin-left: 20px;
			}
		}
		button {
			margin-left: 40px;
			font-family: "poppins";
		}
		.consent {
			border-left: 3px solid #0092e0;
			padding-top: 5px;
			padding-left: 5px;
			padding-bottom: 5px;
			margin-left: 40px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;

			@media (max-width: 500px) {
				margin-left: 20px;
			}
			span {
				font-size: 13px;
				margin-left: 15px;
				font-family: "poppins";
				color: #707070;
			}
		}
	}

	p {
		font: normal normal bold 14px "poppins";
		letter-spacing: 0.44px;
		color: #707070;
		opacity: 1;
	}
	::-webkit-scrollbar {
		display: none;
	}
	.btn {
		cursor: pointer;
		color: white;
		margin-right: 20px;
		background: #0092e0 0% 0% no-repeat padding-box;
		border-radius: 10px;
		opacity: 1;
		height: 30px;
		outline: none;
		/* border: 1px solid #0092e0; */
	}
	.add-btn {
		width: 250px;
		color: #0092e0;
		margin-right: 20px;
		background: #ffffff 0% 0% no-repeat padding-box;
		border-radius: 20px;
		opacity: 1;
		outline: 0;
		border: 1px solid #0092e0;
		cursor: pointer;
		margin-bottom: 20px;
		padding-top: 8px;
		padding-bottom: 8px;
		font-weight: bold;
		&:hover {
			background: #0092e0 0% 0% no-repeat padding-box;
			color: white;
		}
	}
	.proceed {
		width: 200px;
		padding: 8px;
		border-radius: 17px;
		cursor: pointer;
		color: white;
		margin-right: 20px;
		background: #0092e0 0% 0% no-repeat padding-box !important;
		opacity: 1;
		outline: none;
		border: 1px solid #0092e0;
		font-family: "poppins";
	}
	.notallowed {
		cursor: not-allowed;
	}
`;

const SelectSch = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 7px;
	/* height: 150px; */
	box-shadow: 0px 0px 10px #00000029;
	margin-top: 20px;

	.buttons {
		padding-left: 30px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;

		.btn {
			width: 140px;
			color: white;
			margin-right: 20px;
			background: #0092e0 0% 0% no-repeat padding-box;
			border-radius: 10px;
			opacity: 1;
			height: 30px;
			outline: none;
			/* border: 1px solid #0092e0; */
		}
	}
	.invoice-table {
		tr {
			td,
			th {
				width: 29% !important;
			}
		}
	}
	.new-table {
		margin-top: 10px;
		width: 100%;
		/* background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029; */

		/* height: 90%; */
		overflow-x: hidden;
		margin-bottom: 10px;
		padding-bottom: 20px;
		.first-section {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			align-content: center;
			margin-left: 20px;
			width: 65%;

			@media (max-width: 600px) {
				display: flex;
				flex-direction: column;
			}
		}
		.second-section {
			display: flex;
			justify-content: space-between;
			margin-top: 1rem;
			margin-left: 20px;
			margin-bottom: 50px;
			width: 65%;
		}
		.customer {
			margin-top: 0.5rem;
			p {
				margin-bottom: -0.5rem;
				font-size: 16px;
			}
		}
		.invoice {
			display: flex;
			justify-content: space-between;
			margin-left: -7rem;
		}
		.date {
			margin-right: 3rem;
			text-align: right;
			@media (max-width: 600px) {
				margin-right: 0 !important;
			}
			p {
				margin-bottom: -0.5rem;
				font-size: 16px !important;
				color: black !important;
			}
		}
		.info {
			text-align: left;
			p {
				margin-bottom: -0.5rem;
				font-size: 16px !important;
				color: black !important;
			}
		}
		.hide-table {
			display: none;
		}

		table {
			margin: 0 auto;
			width: 95%;
			border-collapse: collapse;
			text-align: left;
			overflow: hidden;
			font-size: 14px;
			.mobile-header {
				display: none;
			}

			td,
			th {
				padding: 10px;
			}

			td {
				/* border-left: 1px solid #ecf0f1;
        border-right: 1px solid #ecf0f1; */
			}

			th {
				background-color: #0092e0;
				color: white;
			}

			/* tr:nth-of-type(even) td {
        background-color: lighten(#4ecdc4, 35%);
      } */
			tr {
				cursor: pointer;
				&:nth-child(odd) {
					background-color: #f3f2ee;
				}
				&:hover {
					background-color: #d9f4f2;
				}
			}
		}
	}
`;
