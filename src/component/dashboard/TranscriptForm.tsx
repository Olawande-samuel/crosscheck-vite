import {
	faCaretDown,
	faCaretRight,
	faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as Yup from "yup";
import arrow from "../../asset/arrow-right.svg";
import cap from "../../asset/graduation-cap.svg";
import account from "../../asset/icon_account.svg";
import qualifications from "../../asset/qualification.svg";
import useUser from "../../hooks/useUser";
import { fetchInstitutes, setPageInfo } from "../../state/actions/institutions";
import Institutions from "./Institutions";
import { cn } from "./utils";

function TranscriptForm({
	initialValues,
	updateFormValues,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initialValues: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateFormValues: (data: any) => void;
	deleteTranscription: VoidFunction;
}) {
	const [activeTab, setActiveTab] = useState("individual-details");
	// const [pay, setPay] = useState(false);
	const [details, setDetails] = useState(true);

	const dispatch = useDispatch();

	const [selectedInst, setSelectedInst] = useState<InstitutionProps>();
	const [schCard, setSchCard] = useState(false);
	const [destination, setDestination] = useState("");

	const user = useUser();

	useEffect(() => {
		dispatch(fetchInstitutes([]));
		dispatch(setPageInfo({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formik = useFormik({
		initialValues,

		onSubmit: async (values) => {
			for (const propName in values) {
				if (
					values[propName] === null ||
					values[propName] === undefined ||
					values[propName] === ""
				) {
					delete values[propName];
				}
			}

			updateFormValues({
				...values,
				institution: selectedInst?.name,
				amount: selectedInst?.["transcriptFee"],
				email: user?.email,
				requester: user?.firstName,
				destination: destination,
			});
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string().required("First Name is required").min(2),
			lastName: Yup.string().required("Last Name is required").min(2),
			course: Yup.string().required("Course required"),
			matricNo: Yup.string().required("Matric Number is required"),
			graduationYear: Yup.string().required("Graduation year is required"),
			address: Yup.string().required("Address is required"),
			destinationNumber: Yup.string().required(
				"Destination number is required"
			),
			city: Yup.string().required("city is required"),
			zipCode: Yup.string().required("Zip code is required"),
		}),
	});

	const submitRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!selectedInst?.name) {
			return toast.error("please select a school");
		} else if (
			formik.values.address.length === 0 ||
			formik.values.city.length === 0 ||
			formik.values.destinationNumber.length === 0 ||
			formik.values.zipCode.length === 0
		) {
			return toast.error("Please fill all required fields");
		}
		formik.handleSubmit();
		toast.success("Details saved");
	};
	const handleQualificationTab = () => {
		if (
			formik.values.firstName.length === 0 ||
			formik.values.lastName.length === 0 ||
			formik.values.course.length === 0 ||
			formik.values.graduationYear.length === 0 ||
			formik.values.matricNo.length === 0
		) {
			toast.error("Please fill required fields");
			return;
		}

		setActiveTab("destination-details");
		// setActiveStep(2)
		// setPay(true);
	};

	return (
		<SingleCheck
			style={{
				paddingBottom: !details ? "20px" : "",
				marginBottom: !details ? "40px" : "",
			}}
		>
			{schCard && (
				<SelectCheck
					onClick={() => {
						setDetails(!details);
					}}
				>
					<div style={{ width: "100%" }}>
						<img src={cap} alt="graduation cap" />
						<h3>Transcript Request - {formik.values.institution}</h3>
					</div>
					<FontAwesomeIcon
						icon={details ? faCaretDown : faCaretRight}
						className="arrow"
					/>{" "}
				</SelectCheck>
			)}
			{schCard ? (
				<SelectSch style={{ display: !details ? "none" : "" }}>
					<p className="institution-details">Institution Details</p>
					<div className="inst-name">
						<span>Institution name</span>
						<span>
							{selectedInst?.name}{" "}
							<span className="change" onClick={() => setSchCard(false)}>
								<small>change</small>
							</span>
						</span>
					</div>
					<div className="sch-country">
						<span>Country</span>
						<span>{selectedInst?.country}</span>
					</div>
				</SelectSch>
			) : (
				<Institutions
					setSelectedInst={setSelectedInst}
					setSchCard={setSchCard}
					formik={formik}
				/>
				// <p>Select preferred institute to order transcript</p>
				// <SelectSch>
				// 	<div className="req-trans">
				// 		<img src={Institution} alt="select a sch" />

				// 		<div className="select-inst">
				// 			<p>Select an institute</p>
				// 			<p>Select preferred institute to order transcript</p>
				// 		</div>
				// 	</div>
				// 	<div className="selects">
				// 		<div className="institution-wrapper">
				// 			<label style={{ paddingLeft: "5px" }}>SELECT INSTITUTION</label>
				// 			<input
				// 				type="text"
				// 				className="schl-input placeholder:text-sm flex-1"
				// 				onChange={handleInputChange}
				// 				value={input}
				// 				name="input"
				// 				placeholder="Search for a school"
				// 			/>
				// 		</div>

				// 		<div className="select-country">
				// 			<label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
				// 			<CountryDropdown
				// 				name="country"
				// 				id="country"
				// 				classes="country border-2 border-[#e2e2e2] outline-none rounded-[14px] text-sm italic font-['poppins']"
				// 				valueType="full"
				// 				value={formik.values.country}
				// 				onChange={(val, e) => {
				// 					formik.handleChange(e);
				// 					setCountry(val.toLowerCase());
				// 					setByCountryOffset(0);
				// 					setByCountryandNameOffset(0);
				// 					setOffset(0);
				// 				}}
				// 				onBlur={formik.handleBlur}
				// 			/>
				// 		</div>
				// 	</div>
				// 	{(input.length > 0 || country.length > 0) &&
				// 		institutions.length > 0 && (
				// 			<div className="new-table">
				// 				<table
				// 					cellSpacing="0"
				// 					cellPadding="0"
				// 					border={0}
				// 					className={hideTable ? "hide-table" : ""}
				// 				>
				// 					<thead className="table-headers">
				// 						<tr>
				// 							<th>Name</th>
				// 							<th>Country</th>
				// 							<th>Institute charge</th>
				// 							<th>Our Charge</th>
				// 						</tr>
				// 					</thead>
				// 					<tbody>
				// 						{institutions.map((ite: InstitutionProps) => (
				// 							<tr onClick={() => handleSelected(ite)} key={ite.name}>
				// 								<th className="mobile-header">Number</th>
				// 								<td>{ite.name}</td>
				// 								<th className="mobile-header">Market rate</th>
				// 								<td>{ite.country}</td>
				// 								<th className="mobile-header">Weight</th>
				// 								<td>-</td>
				// 								<th className="mobile-header">Value</th>
				// 								{userCountry !== "NG" && (
				// 									<td>${toDollar(ite["transcriptFee"])}</td>
				// 								)}
				// 								{userCountry === "NG" && (
				// 									<td>&#8358;{ite["transcriptFee"] || 0}</td>
				// 								)}
				// 							</tr>
				// 						))}
				// 					</tbody>
				// 				</table>
				// 				{!hideTable && (
				// 					<div className="pagination-line">
				// 						<p>
				// 							Showing {institutions.length} of {pageInfo.totalDocs} of
				// 							entries
				// 						</p>

				// 						<ReactPaginate
				// 							previousLabel={"previous"}
				// 							nextLabel={"next"}
				// 							breakLabel={"..."}
				// 							breakClassName={"break-me"}
				// 							pageCount={pagesCount}
				// 							marginPagesDisplayed={2}
				// 							pageRangeDisplayed={5}
				// 							onPageChange={(e) => handleNext(e)}
				// 							containerClassName={"pagination"}
				// 							// subContainerClassName={"pages pagination"}
				// 							activeClassName={"active"}
				// 							initialPage={0}
				// 						/>
				// 					</div>
				// 				)}
				// 			</div>
				// 		)}
				// </SelectSch>
			)}
			<FormContainer style={{ display: !details ? "none" : "" }}>
				<form>
					<div className="tabs">
						<ul className="px-4 md:px-6">
							<li
								role="button"
								onClick={() => {
									setActiveTab("individual-details");
									// setPay(false);
								}}
								className={cn(
									"flex items-center",
									activeTab === "individual-details" ? "activeTab" : ""
								)}
							>
								<img src={account} alt="details" />
								&nbsp; Individual details
							</li>
							<li
								role="button"
								onClick={handleQualificationTab}
								className={cn(
									"flex items-center",
									activeTab === "destination-details" ? "activeTab" : ""
								)}
							>
								<img src={qualifications} alt="details" />
								&nbsp; Destination details
							</li>
						</ul>
					</div>
					{activeTab === "individual-details" && (
						<FormDiv className="px-4">
							<Field>
								<label>
									First Name
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										id="firstName"
										name="firstName"
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className={cn(
											"p-1 !h-auto",
											formik.touched.firstName && formik.errors.firstName
												? "first-input err"
												: "first-input"
										)}
									/>
									{formik.touched.firstName && formik.errors.firstName ? (
										<div
											className="error"
											style={{ marginLeft: "-500px", paddingTop: "3px" }}
										>
											{formik.errors.firstName as string}
										</div>
									) : null}
								</>
							</Field>

							<Field>
								<label>
									Last Name
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.lastName && formik.errors.lastName
												? "last-input err"
												: "last-input"
										)}
										name="lastName"
										value={formik.values.lastName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.lastName && formik.errors.lastName ? (
										<div
											className="error"
											style={{ marginLeft: "-500px", paddingTop: "3px" }}
										>
											{formik.errors.lastName as string}
										</div>
									) : null}
								</>
							</Field>

							<Field>
								<label>
									Matric No<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.matricNo && formik.errors.matricNo
												? "matric-input err"
												: "matric-input"
										)}
										name="matricNo"
										value={formik.values.matricNo}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.matricNo && formik.errors.matricNo ? (
										<div
											className="error"
											style={{ marginLeft: "-500px", paddingTop: "3px" }}
										>
											{formik.errors.matricNo as string}
										</div>
									) : null}
								</>
							</Field>

							<Field className="DOB">
								<label>
									Course
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.course && formik.errors.course
												? "course-input err"
												: "course-input"
										)}
										name="course"
										value={formik.values.course}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.course && formik.errors.course ? (
										<div
											className="error"
											style={{ marginLeft: "-500px", paddingTop: "3px" }}
										>
											{formik.errors.course as string}
										</div>
									) : null}
								</>
							</Field>

							<Field className="DOB">
								<label>
									Graduation Year
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.graduationYear &&
												formik.errors.graduationYear
												? "graduationyear-input err"
												: "graduationyear-input"
										)}
										name="graduationYear"
										value={formik.values.graduationYear}
										placeholder="e.g 2012"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.graduationYear &&
									formik.errors.graduationYear ? (
										<div
											className="error"
											style={{ marginLeft: "-500px", paddingTop: "3px" }}
										>
											{formik.errors.graduationYear as string}
										</div>
									) : null}
								</>
							</Field>
							{/* 
              <Field>
                <label>Reference ID</label>
                <input type="text" className="ref-input" />
              </Field> */}
							{/* <p className="ref">
                The reference number will be used to track this case in your
                internal system if you have one
              </p> */}
							<button
								className={
									formik.values.firstName.length === 0 ||
									formik.values.lastName.length === 0 ||
									formik.values.course.length === 0 ||
									formik.values.graduationYear.length === 0 ||
									formik.values.matricNo.length === 0
										? "btn notallowed"
										: "btn"
								}
								onClick={handleQualificationTab}
							>
								Next
								<img src={arrow} alt="right" />
							</button>
						</FormDiv>
					)}
					{/* =======Destination DETAILS===== */}
					{activeTab === "destination-details" && (
						<FormDiv className="px-4">
							<Field>
								<label>
									Destination Country
									<span>*</span>
								</label>
								<>
									<CountryDropdown
										name="destination"
										id="destination"
										classes="destination-country"
										valueType="full"
										value={destination}
										onChange={(val) => {
											setDestination(val);
										}}
									/>
								</>
							</Field>

							<Field>
								<label>
									Destination Address
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.address && formik.errors.address
												? "address-input err"
												: "address-input"
										)}
										name="address"
										value={formik.values.address}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.address && formik.errors.address ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{formik.errors.address as string}
										</div>
									) : null}
								</>
							</Field>

							<Field>
								<label>
									Zip/Postcode
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.ZipCode && formik.errors.ZipCode
												? "postcode-input err"
												: "postcode-input"
										)}
										name="zipCode"
										placeholder="eg 11101"
										value={formik.values.ZipCode}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.ZipCode && formik.errors.ZipCode ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{formik.errors.ZipCode as string}
										</div>
									) : null}
								</>
							</Field>

							<Field>
								<label>
									Destination Number
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.destinationNumber &&
												formik.errors.destinationNumber
												? "destination-input err"
												: "destination-input"
										)}
										name="destinationNumber"
										placeholder="Enter destination phone number"
										value={formik.values.destinationNumber}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.destinationNumber &&
									formik.errors.destinationNumber ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{formik.errors.destinationNumber as string}
										</div>
									) : null}
								</>
							</Field>

							<Field>
								<label>
									City<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.city && formik.errors.city
												? "city-input err"
												: "city-input"
										)}
										name="city"
										value={formik.values.city}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.city && formik.errors.city ? (
										<div
											className="error"
											style={{
												marginLeft: "-620px",
												paddingTop: "3px",
											}}
										>
											{formik.errors.city as string}
										</div>
									) : null}
								</>
							</Field>

							<div className="btns flex">
								<button
									className="btn-prev"
									type="submit"
									onClick={() => {
										setActiveTab("individual-details");
										// setPay(true);
									}}
								>
									<FontAwesomeIcon
										icon={faLongArrowAltLeft}
										style={{ paddingRight: "5px", fontSize: "20px" }}
									/>
									Previous
								</button>
								<button
									// pay={pay}
									onClick={submitRequest}
									className="submit p-1 text-sm px-3 h-auto bg-[#0092e0] text-white rounded-[10px] ml-auto"
								>
									Submit details
								</button>
							</div>
						</FormDiv>
					)}
				</form>
			</FormContainer>
		</SingleCheck>
	);
}

export default TranscriptForm;

const SingleCheck = styled.div`
	background: #ffffff 0% 0% no-repeat padding-box;
	padding: 10px 10px 5px 10px;
	margin-top: 10px;
	margin-bottom: 20px;
`;

const FormContainer = styled.div`
	margin-top: 15px;
	width: 100%;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 7px;
	box-shadow: 0px 0px 10px #00000029;
	overflow-x: hidden;
	margin-bottom: 25px;
	padding-bottom: 20px;
	.DOB {
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
		}
		input {
			@media (max-width: 500px) {
				/* width: 250px !important; */
			}
		}
	}
	.btns {
		@media (max-width: 400px) {
			display: flex;
			justify-content: space-between;
		}
		@media (max-width: 500px) {
			display: flex;
			justify-content: space-between;
		}
	}
	.btn {
		float: right;
		display: flex;
		align-items: center;
		justify-content: space-around;

		/* width: 80px; */
		color: white;
		margin-right: 30px;
		background: #0092e0 0% 0% no-repeat padding-box;
		border-radius: 10px;
		opacity: 1;
		height: 30px;
		outline: none;
		border-color: #0092e0;
		@media (max-width: 400px) {
			margin-left: 3rem;
			/* margin-right: -1rem; */
		}
	}
	.btn-prev {
		display: none;
		@media (max-width: 500px) {
			float: right;
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-left: 1.5rem;

			/* width: 80px; */
			color: white;
			background: #0092e0 0% 0% no-repeat padding-box;
			border-radius: 10px;
			margin-right: 20px;
			opacity: 1;
			height: 30px;
			outline: none;
			border: none;
			@media (max-width: 400px) {
				margin-left: 0.5rem;
				margin-right: 0px;
			}
		}
	}
	.notallowed {
		cursor: not-allowed;
	}
	.tabs {
		width: 100%;
		height: 35px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		/* margin: 0 auto; */
		border-bottom: 1px solid #707070;
		@media (max-width: 500px) {
			display: none;
		}
		ul {
			display: flex;
			justify-content: space-between;
			margin-top: 0px !important;
			margin-bottom: 0px !important;
			li {
				list-style-type: none;
				margin-right: 45px;
				cursor: pointer;

				&.activeTab {
					border-bottom: 2px solid #0092e0;
					font-weight: 500;
					color: #0092e0;
				}
			}
		}
	}
	.delete {
		width: 180px;
		color: #0092e0;
		margin-left: 20px;
		background: #ffffff 0% 0% no-repeat padding-box !important;
		border-radius: 18px;
		opacity: 1;
		height: 30px;
		outline: none;
		border: 1px solid #0092e0;
		cursor: pointer;
		padding-left: 5px;
		padding-right: 5px;
		&:hover {
			background: #0092e0 0% 0% no-repeat padding-box !important;
			color: white;
		}
	}
`;

const FormDiv = styled.div`
	width: 100%;
	margin-top: 20px;
	.ref {
		font-family: "Roboto" !important;
	}
	.enrollment-status {
		display: flex;
		align-items: center;
		padding-left: 40px;
		padding-bottom: 40px;
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding-left: 15px;
		}
		.enr-status {
			display: flex;
			align-items: center;
		}
	}

	.btn {
		float: right;
		display: flex;
		align-items: center;
		justify-content: space-around;

		width: 80px;
		color: white;
		margin-right: 20px;
		background: #0092e0 0% 0% no-repeat padding-box !important;
		border-radius: 10px;
		opacity: 1;
		height: 30px;
		outline: none;
		/* border-color: #0092e0; */
	}

	.notallowed {
		cursor: not-allowed;
	}
	p {
		font-size: 12px;
		padding-left: 135px;
		margin-top: -20px;
		@media (max-width: 500px) {
			padding-left: 10px;
			margin-top: 5px;
		}
	}
`;
const Field = styled.div`
	width: 100%;
	padding-left: 40px;
	padding-bottom: 20px;

	@media (max-width: 500px) {
		padding-left: 15px;
	}
	.upload-text {
		padding-left: 0px !important;
		padding-top: 10px;
	}
	input {
		width: 65%;
		height: 30px;
		border: 1px solid #707070cc;
		border-radius: 5px;
		outline: none;

		@media (max-width: 500px) {
			font-size: 16px;
			width: 90%;
		}
	}
	.destination-country {
		width: 66%;
		height: 35px;
		border: 1px solid #707070cc;
		border-radius: 5px;
		outline: none;
		margin-left: 35px;
		@media (max-width: 500px) {
			font-size: 16px;
			width: 91.5%;
		}
	}
	.err {
		border: 1px solid red !important;
	}
	label {
		span {
			color: red;
		}
	}
	.first-input {
		margin-left: 61px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.matric-input {
		margin-left: 67px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.last-input {
		margin-left: 62px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.course-input {
		margin-left: 84px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.graduationyear-input {
		margin-left: 29px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.ref-input {
		margin-left: 56px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.student-input {
		margin-left: 34px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.address-input {
		margin-left: 35px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.postcode-input {
		margin-left: 75px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.destination-country {
		margin-left: 35px;
		@media (max-width: 400px) {
			margin-left: 0px;
		}
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.city-input {
		margin-left: 125px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.graduation-input {
		margin-left: 3px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.destination-input {
		margin-left: 35px;
		@media (max-width: 400px) {
			margin-left: 0px;
		}
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
`;
const SelectCheck = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background: #fafafb 0% 0% no-repeat padding-box;
	border-radius: 7px;
	border-radius: 7px;
	box-shadow: 0px 0px 10px #00000029;
	margin-top: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
	cursor: pointer;
	div {
		display: flex;
		margin-left: 5px;
	}
	.arrow {
		margin-right: 5px;
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

	.institution-details {
		margin-left: 30px;
		border-bottom: 1px solid gray;
		width: 90%;
		p {
			padding-bottom: 10px;
		}
	}
	.sch-country {
		padding-left: 30px;
		padding-top: 10px;
		padding-bottom: 40px;
		span {
			&:nth-child(1) {
				font: normal normal bold 12px/14px "poppins";
				letter-spacing: 0.32px;
				color: #707070;
			}
			&:nth-child(2) {
				padding-left: 100px;
				font: normal normal normal 12/14px "poppins";
				letter-spacing: 0.32px;
				color: #707070;
			}
		}
	}
	.inst-name {
		padding-left: 30px;
		padding-top: 10px;
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding-left: 20px;
		}
		span {
			&:nth-child(1) {
				font: normal normal bold 12px/14px "poppins";
				letter-spacing: 0.32px;
				color: #707070;
			}
			&:nth-child(2) {
				padding-left: 40px;
				font: normal normal normal 12/14px "poppins";
				letter-spacing: 0.32px;
				color: #707070;
				@media (max-width: 500px) {
					padding-left: 0px;
				}
			}
		}
		.change {
			margin-left: 7px;
			background: #ff0000 0% 0% no-repeat padding-box;
			border-radius: 3px;
			padding-left: 5px;
			padding-right: 5px;
			cursor: pointer;
			small {
				font: normal normal bold 12px/14px "poppins";
				letter-spacing: 0.24px;
				color: #b30000;
				opacity: 1;
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
	.selects {
		display: flex;
		margin-top: 25px;
		width: 100%;
		padding-bottom: 20px;
		.select-country {
			display: flex;
			flex-direction: column;
			padding-left: 20px;
			width: 46%;
			label {
				font-family: "poppins";
				font-size: 14px;
				color: #707070;
			}
			@media (max-width: 500px) {
				width: 88%;
				margin-bottom: 20px;
				input {
					width: 0 !important;
				}
			}
			label {
				@media (max-width: 500px) {
					font-size: 14px;
					font-family: "Roboto";
				}
			}
		}
		.select-schol {
			height: 34px;
			border: 2px solid #e2e2e2;
			outline: none;
			width: 100%;
			font-family: "poppins";
			font-style: italic;
			border-radius: 14px;
			color: #707070;
		}
		@media (max-width: 500px) {
			flex-direction: column;
		}
	}

	.institution-wrapper {
		display: flex;
		flex-direction: column;
		padding-left: 30px;
		width: 46%;
		label {
			font-family: "poppins";
			font-size: 14px;
			color: #707070;
		}
		@media (max-width: 500px) {
			padding-left: 20px;
		}
		input {
			border: 2px solid #e2e2e2;
			outline: none;
			width: 100%;
			border-radius: 14px;
			font-family: "poppins";
			font-style: italic;
			padding-left: 5px;
			@media (max-width: 500px) {
				height: 30px;
			}
		}
		@media (max-width: 500px) {
			width: 85%;
			padding-right: 0px;
			label {
				font-size: 14px !important;
			}
		}
	}
	.req-trans {
		display: flex;
		width: 45%;
		padding-left: 20px;
		justify-content: space-between;
		margin-top: 10px;
		@media (max-width: 500px) {
			width: 90%;
		}
		.select-inst {
			p {
				font-family: "poppins";
				&:nth-child(1) {
					font-size: 16px;
				}
				&:nth-child(2) {
					font-size: 14px;
					font-weight: normal;
				}
			}
			@media (max-width: 500px) {
				margin-left: 20px;
			}
		}

		p {
			&:nth-child(1) {
				font-weight: bold;
				margin-bottom: 3px;
				font-family: "poppins";
				font-size: 16px;
				letter-spacing: 0.44px;
				color: #173049;
			}
			&:nth-child(2) {
				font-family: "poppins";
				font-size: 16px;
				letter-spacing: 0.44px;
				color: #707070;
				margin: 0;
			}
		}
	}
`;
