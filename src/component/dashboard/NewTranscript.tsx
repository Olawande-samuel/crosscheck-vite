import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useBlocker, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import arrow from "../../asset/arrow-right.svg";
import Logo from "../../asset/CrossCheckLogo.png";
import Layout from "./DashboardLayout";
import "./ver.css";
// import {ReactComponent as Qualification } from '../../asset/qualification.svg'
import { TranscriptPayload } from "@/state/actions/action_types";
import { useTranscriptStore } from "@/store/useTranscriptStore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { FieldArray, Form, Formik } from "formik";
import generatePDF from "react-to-pdf";
import useFlutterwaveConfig from "../../hooks/useFlutterwaveConfig";
import useUser from "../../hooks/useUser";
import useUserLocation from "../../hooks/useUserLocation";
import { BASE_URL } from "../../state/constant/constants";
import ActivitySteps from "./ActivitySteps";
import TranscriptForm from "./TranscriptForm";
import { cn, toDollar } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = (data: any, token: string) => {
	axios({
		data,
		method: "post",
		url: `${BASE_URL}/api/v1/transcripts/request`,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,
		},
	});
};

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor:'#43496a',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: '#43496a'
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:'#D7DADB',
//     borderRadius: 1,
//   },
// }));

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor: '#0092e0',
//   zIndex: 1,
//   color: '#fff',
//   width: 50,
//   height: 50,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   ...(ownerState.active && {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   }),
//   ...(ownerState.completed && {
//     backgroundImage:
//       'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,146,224,1) 0%, rgba(0,212,255,1) 100%);',
//   }),
// }));

// function ColorlibStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: <Qualification />,
//     2: <Details />,
//     3: <Payment />,
//     4: <Finish/>
//   };

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }
// const steps = ['START', 'VERIFICATON DETAILS', 'PROCESS PAYMENT', 'FINISH'];

// interface FormValues {
// 	[key: string]: string | undefined;
// 	id: string;
// 	firstName: string;
// 	lastName: string;
// 	course: string;
// 	graduationYear: string;
// 	address: string;
// 	zipCode: string;
// 	requester: string;
// 	destinationNumber: string;
// 	city: string;
// 	matricNo: string;
// 	institution?: string;
// 	amount?: string;
// 	email?: string;
// 	destination?: string;
// }
const NewTranscript = () => {
	const [activeStep, setActiveStep] = useState(1);
	const targetRef = useRef<HTMLDivElement | null>(null);
	const location = useLocation();

	const { data, addTranscript } = useTranscriptStore();

	const [isBlocking] = useState(true);
	const blocker = useBlocker(isBlocking);

	const formData = {
		firstName: "",
		lastName: "",
		course: "",
		graduationYear: "",
		address: "",
		zipCode: "",
		requester: "",
		destinationNumber: "",
		city: "",
		matricNo: "",
	};

	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();
	const splitDate = `${month}-${day}-${year}`;

	const [requestList, setRequestList] = useState(false);

	const [checked, setChecked] = useState(false);
	// const [userCountry, setUserCountry] = useState("");

	// const toDollar = (amount: number) => {
	// 	return (Number(amount) / Number(convertedUsd)).toFixed(2);
	// };
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

	const userCountry = useUserLocation();

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
	};

	const processPayment = async () => {
		await Promise.allSettled(
			data.map((value) => request(value, user?.token ?? ""))
		);
	};

	const total = data.reduce(
		(accumulator, currentValue) =>
			accumulator +
			Number(
				userCountry && userCountry === "NG"
					? currentValue.amount
					: toDollar(currentValue.amount ?? 0)
			),
		0
	);
	const user = useUser();

	function paymentSuccessCallback() {
		closePaymentModal(); // this will close the modal programmatically
		processPayment();
		addTranscript([]);
		setRequestList(false);
		addTranscript([{ ...formData }]);
		toast.success("request submitted");
		// setTimeout(() => {
		// 	navigate(`/dashboard/${user?.id}`);
		// }, 1500);
	}
	const fwConfig = useFlutterwaveConfig({
		total,
		userCountry,
		cb: paymentSuccessCallback,
	});

	const verify = async (formValues: TranscriptPayload[]) => {
		for (let i = 0; i < formValues.length; i++) {
			for (const property in formValues[i]) {
				if (
					property in formValues[i] &&
					formValues[i][property as keyof TranscriptPayload] === ""
				) {
					return toast.error(
						"Please complete and submit all verification details"
					);
				}
			}
		}
		console.log(formValues);
		addTranscript(formValues);
		setRequestList(true);
	};

	return (
		<Formik
			initialValues={{ formValues: [{ ...formData }] }}
			onSubmit={(values) => {
				console.log({ values });
				verify(values.formValues);
			}}
		>
			<Form>
				<FieldArray name="formValues">
					{() => (
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
									{" "}
									<h2 className="new-heading my-[0.83em]">
										New Transcript Order
									</h2>
								</div>
								<div className="mt-[15px] mb-5">
									<ActivitySteps activeStep={activeStep} />
								</div>

								{!requestList && (
									<FieldArray
										name="formValues"
										render={({ remove, form }) => (
											<div>
												{form.values.formValues.map(
													(val: TranscriptPayload, index: number) => (
														<div className="" key={index}>
															<TranscriptForm
																key={index}
																initialValues={val}
																updateFormValues={(data) => {
																	form.setFieldValue(
																		`formValues.${index}`,
																		data
																	);
																}}
																deleteTranscription={() => remove(index)}
																// setActiveStep={setActiveStep}
																// activeStep={activeStep}
															/>
														</div>
													)
												)}
											</div>
										)}
									/>
								)}
								<div className={requestList ? "none" : "bottom-button"}>
									<div className="consent flex items-center pl-3">
										<input
											type="checkbox"
											value={String(checked)}
											name="checked"
											onChange={handleCheck}
											id="consent"
										/>
										<label htmlFor="consent" className="mb-0">
											I hold the written consent of the individuals named above
											and have provided copies of these consents where
											requested.
										</label>
									</div>
									<button
										onClick={() => {
											setActiveStep(2);
										}}
										className={cn(
											"text-sm flex gap-3 items-center justify-center",
											!checked ? "notallowed proceed" : "proceed"
										)}
										disabled={!checked}
									>
										Proceed to pay <img src={arrow} alt="right" />
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
														<th>our charge</th>
														<th>Institute Charge</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{data.length > 0 &&
														data.map((ver) => (
															<tr key={ver.institution}>
																<th className="mobile-header">Number</th>
																<td>{ver.institution}</td>
																<th className="mobile-header">Weight</th>
																<td>
																	{" "}
																	{userCountry === "NG" ? (
																		<td>&#8358;{ver.amount}</td>
																	) : (
																		<td>${toDollar(ver.amount ?? 0)}</td>
																	)}
																</td>
																<th className="mobile-header">Value</th>
																<td>-</td>
																<td></td>
															</tr>
														))}

													<td></td>
													<td style={{ color: "black", fontWeight: "bold" }}>
														TOTAL
													</td>
													{userCountry === "NG" ? (
														<p style={{ fontWeight: "bold" }}>&#8358;{total}</p>
													) : (
														<p style={{ fontWeight: "bold" }}>${total}</p>
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
											{/* <Pdf targetRef={ref} filename="receipt.pdf">
									{({ toPdf }) => (
									)}
								</Pdf> */}
										</div>
										<div className="buttons">
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

export default NewTranscript;

const VerificationBody = styled.div`
	height: 100%;
	padding-left: 30px;
	overflow-y: scroll;
	padding-right: 30px;
	background: #fafafb;
	font-family: "poppins";
	.new-heading {
		font-family: "poppins";
		letter-spacing: 0px;
		color: #0092e0;
		opacity: 1;
		font-size: 32px;
		font-weight: lighter;
	}
	@media (max-width: 500px) {
		padding-right: 16px;
		padding-left: 16px;
	}
	.step-text {
		width: 64%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		font-size: 12px;
		margin-top: 20px;
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
		button {
			margin-left: 40px;
		}
		.consent {
			border-left: 3px solid #0092e0;
			padding-top: 5px;
			padding-bottom: 5px;
			margin-left: 40px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			@media (max-width: 500px) {
				padding: 10px;
				margin-left: 20px;
				input {
					margin-left: -5px;
					margin-right: 10px;
				}
			}
			label {
				/* font-size: 16px; */
				margin-left: 15px;
				color: #707070;
				font-weight: normal;
				font-family: "poppins";
				@media (max-width: 500px) {
					margin-left: 0;
				}
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
		font-family: "poppins";
	}
	.add-btn {
		width: 250px;
		color: #0092e0;
		margin-right: 20px;
		background: #ffffff 0% 0% no-repeat padding-box;
		border-radius: 20px;
		opacity: 1;
		outline: 0;
		/* border: 1px solid #0092e0; */
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
	.invoice-table {
		tr {
			td,
			th {
				width: 29% !important;
			}
		}
	}
	.buttons {
		padding-left: 30px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;

		.btn {
			width: 140px;
			color: white;
			margin-right: 20px;
			background: #0092e0 0% 0% no-repeat padding-box !important;
			border-radius: 10px;
			opacity: 1;
			height: 30px;
			outline: none;
			/* border: 1px solid #0092e0; */
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
		.hide-table {
			display: none;
		}

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
