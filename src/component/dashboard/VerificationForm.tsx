import {
	faCaretDown,
	faCaretRight,
	faLongArrowAltLeft,
	faLongArrowAltRight,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { subYears, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as Yup from "yup";

import arrow from "../../asset/arrow-right.svg";
import document from "../../asset/document-attach.svg";
import uparrow from "../../asset/format.svg";
import cap from "../../asset/graduation-cap.svg";
import account from "../../asset/icon_account.svg";
import qualifications from "../../asset/qualification.svg";
import useUser from "../../hooks/useUser";
import { fetchInstitutes, setPageInfo } from "../../state/actions/institutions";
import { RootState } from "../../store";
import Institutions from "./Institutions";
import { FormValues } from "./NewVerifications";
import { cn } from "./utils";

export interface VerificationFormValues extends FormValues {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	certImage?: any;
	country?: string;
}

interface Props {
	deleteOneVerification: VoidFunction;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateFormValues: (data: any) => void;
	initialValues: VerificationFormValues;
	verificationsLength: number;
}

function VerificationForm({
	initialValues,
	updateFormValues,
	deleteOneVerification,
	verificationsLength,
}: Props) {
	const [activeTab, setActiveTab] = useState("individual-details");
	// const [pay, setPay] = useState(false);
	const [details, setDetails] = useState(true);

	const dispatch = useDispatch();

	const { selectedInstitution } = useSelector(
		(state: RootState) => state.verifications
	);

	const [selectedInst, setSelectedInst] = useState(
		selectedInstitution?.name ? selectedInstitution : {}
	);

	const [schCard, setSchCard] = useState(true);

	const user = useUser();

	const [maxDate, setMaxDate] = useState<string>("");
	const [minDate, setMinDate] = useState<string>("");

	useEffect(() => {
		const today = new Date();
		const sixteenYearsAgo = subYears(today, 17);
		const hundredYearsAgo = subYears(today, 100);

		setMaxDate(format(sixteenYearsAgo, "yyyy-MM-dd"));
		setMinDate(format(hundredYearsAgo, "yyyy-MM-dd"));
	}, []);

	useEffect(() => {
		// clean up
		dispatch(fetchInstitutes([]));
		dispatch(setPageInfo({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formik = useFormik({
		initialValues,

		onSubmit: async (values) => {
			for (const propName in values) {
				const key = propName as keyof VerificationFormValues;
				if (
					values[key] === null ||
					values[key] === undefined ||
					values[key] === ""
				) {
					delete values[key];
				}
			}
			const { ourCharge, instituteCharge } = selectedInst;

			updateFormValues({
				...values,
				enrollmentStatus: values.enrollmentStatus.toString(),
				email: user?.email,
				requester: user?.firstName,
				ourCharge,
				instituteCharge,
			});
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string()
				.required("First Name is required")
				.min(3, "First Name must be at least 2 characters"),
			lastName: Yup.string()
				.required("Last Name is required")
				.min(3, "Last Name must be at least 2 characters"),
			dateOfBirth: Yup.string().required("DOB required"),
			studentId: Yup.string().required("studentID is required"),
			course: Yup.string()
				.required("Course is required")
				.min(3, "Course must be at least 3 characters"),
			qualification: Yup.string()
				.required("Qualification is required")
				.min(3, "Qualification must be at least 3 characters"),
			classification: Yup.string()
				.required("Classification is required")
				.min(3, "Classification must be at least 3 characters"),
			admissionYear: Yup.number().typeError("Enter valid year"),
			graduationYear: Yup.number().typeError("Enter valid year"),
			enrollmentStatus: Yup.bool().oneOf([true, false]),
		}),
	});

	const submitRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const imageFmt = formik.values?.certImage?.name?.split(".");
		if (!formik.values.certImage) {
			return toast.error("please upload a file");
		} else if (
			!["pdf", "jpg", "jpeg", "png"].includes(imageFmt[imageFmt.length - 1])
		) {
			return toast.error("file format not supported");
		} else if (!selectedInst.name) {
			return toast.error("please select a school");
		}
		formik.handleSubmit();
		toast.success("Verification details saved");
	};

	const handleQualificationTab = (e: React.MouseEvent<Element>) => {
		e.preventDefault();
		if (
			formik.values.firstName.length === 0 ||
			formik.values.lastName.length === 0 ||
			formik.values.dateOfBirth.length === 0
		) {
			toast.error("Please fill required fields");
			return;
		}
		const presentYear = new Date().getFullYear();
		const DOB = Number(formik.values.dateOfBirth.substr(0, 4));
		const age = presentYear - DOB;

		if (age < 17) {
			return toast.error("Age cannot be less than 17years");
		}
		setActiveTab("qualification-details");
		// setPay(false);
	};

	const handleDocumentTab = () => {
		if (
			formik.values.course.length === 0 ||
			formik.values.qualification.length === 0 ||
			formik.values.classification.length === 0 ||
			formik.values.studentId.length === 0 ||
			(Boolean(formik.values.enrollmentStatus) === false &&
				(formik.values.admissionYear.length === 0 ||
					formik.values.graduationYear.length === 0))
		) {
			toast.error("Please fill required fields");
			return;
		}
		if (
			Boolean(formik.values.enrollmentStatus) === false &&
			Number(formik.values.admissionYear) > Number(formik.values.graduationYear)
		) {
			toast.error("Please check admission and graduation year");
			return;
		}
		setActiveTab("documents");
		// setPay(true);
	};

	return (
		<SingleCheck
			style={{
				paddingBottom: !details ? "20px" : "0",
				marginBottom: !details ? "40px" : "0",
			}}
		>
			{formik.values?.institution.length > 0 && schCard && (
				<SelectCheck
					onClick={() => {
						setDetails(!details);
					}}
				>
					<div style={{ width: "100%" }}>
						<img src={cap} alt="graduation cap" />
						<h3
							style={{ fontFamily: "poppins" }}
							className="text-[1.17em] my-4 font-bold"
						>
							Education Check - {formik.values.institution}
						</h3>
					</div>
					<FontAwesomeIcon
						icon={details ? faCaretDown : faCaretRight}
						className="arrow"
					/>{" "}
				</SelectCheck>
			)}
			{formik.values.institution.length > 0 && schCard ? (
				<SelectSch style={{ display: !details ? "none" : "" }}>
					<p className="institution-details my-4">Institution Details</p>
					<div className="inst-name">
						<span>Institution name</span>
						<span>
							{formik.values.institution}{" "}
							<span className="change" onClick={() => setSchCard(false)}>
								<small>change</small>
							</span>
						</span>
					</div>
					<div className="sch-country">
						<span>Country</span>
						<span>{selectedInst.country}</span>
					</div>
				</SelectSch>
			) : (
				<Institutions
					setSelectedInst={setSelectedInst}
					setSchCard={setSchCard}
					formik={formik}
				/>
			)}
			<FormContainer style={{ display: !details ? "none" : "" }}>
				<form>
					<div className="tabs px-4">
						<ul>
							<li
								onClick={() => {
									setActiveTab("individual-details");
									// setPay(false);
								}}
								className={cn(
									"flex items-center gap-1 flex-wrap",
									activeTab === "individual-details" ? "activeTab" : ""
								)}
							>
								<img src={account} alt="details" />
								Individual details
							</li>
							<li
								role="button"
								onClick={(e) => handleQualificationTab(e)}
								className={cn(
									"flex items-center gap-1 flex-wrap",
									activeTab === "qualification-details" ? "activeTab" : ""
								)}
							>
								<img src={qualifications} alt="details" />
								Qualification details
							</li>
							<li
								onClick={handleDocumentTab}
								role="button"
								className={cn(
									"flex items-center gap-1 flex-wrap",
									activeTab === "documents" ? "activeTab" : ""
								)}
							>
								<img src={document} alt="details" />
								Documents
							</li>
						</ul>
					</div>
					{activeTab === "individual-details" && (
						<FormDiv>
							<Field className="flex flex-col sm:flex-row  gap-1">
								<label>
									First Name
									<span>*</span>
								</label>
								<div className="flex-1">
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
											className="error w-[65%] text-center"
											style={{ paddingTop: "3px" }}
										>
											{String(formik.errors.firstName)}
										</div>
									) : null}
								</div>
							</Field>

							<Field className="flex flex-col sm:flex-row  gap-1">
								<label>Middle Name</label>
								<div className="flex-1">
									<input
										type="text"
										className={cn(
											"p-1 !h-auto",
											formik.touched.middleName && formik.errors.middleName
												? "middle-input err"
												: "middle-input"
										)}
										name="middleName"
										value={formik.values.middleName}
										onChange={formik.handleChange}
									/>
								</div>
							</Field>

							<Field className="flex flex-col sm:flex-row  gap-1">
								<label>
									Last Name
									<span>*</span>
								</label>
								<div className="flex-1">
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
											className="error w-[65%] text-center"
											style={{ paddingTop: "3px" }}
										>
											{String(formik.errors.lastName)}
										</div>
									) : null}
								</div>
							</Field>

							<Field className="DOB flex flex-col sm:flex-row  gap-1">
								<label>
									Date of Birth
									<span>*</span>
								</label>
								<div className="flex-1">
									<input
										type="date"
										className={cn(
											"p-1 !h-auto",
											formik.touched.dateOfBirth && formik.errors.dateOfBirth
												? "date-input err"
												: "date-input"
										)}
										max={maxDate}
										min={minDate}
										name="dateOfBirth"
										value={formik.values.dateOfBirth}
										onChange={formik.handleChange}
									/>
									{formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
										<div
											className="error w-[65%] text-center"
											style={{ paddingTop: "3px" }}
										>
											{String(formik.errors.dateOfBirth)}
										</div>
									) : null}
								</div>
							</Field>

							<button
								disabled={
									formik.values.firstName.length === 0 ||
									formik.values.lastName.length === 0 ||
									formik.values.dateOfBirth.length === 0 ||
									new Date().getFullYear() -
										Number(formik.values.dateOfBirth.substr(0, 4)) <
										17
								}
								className="btn disabled:!bg-gray-500 disabled:border-transparent disabled:!text-gray-400"
								onClick={handleQualificationTab}
							>
								Next
								<img src={arrow} alt="right" />
							</button>
						</FormDiv>
					)}
					{/* =======QUALIFICATION DETAILS===== */}
					{activeTab === "qualification-details" && (
						<FormDiv>
							<div className="enrollment-status">
								<label>Enrollment status &nbsp; &nbsp;</label>
								<div className="enr-status">
									<span>Alumni &nbsp;</span>
									<Switch
										checked={formik.values.enrollmentStatus}
										onChange={(checked) => {
											formik.setFieldValue("enrollmentStatus", checked);
										}}
										// value={String(formik.values.enrollmentStatus)}
										name="enrollmentStatus"
										onColor="#0092E0"
										onHandleColor="#2693e6"
										handleDiameter={28}
										uncheckedIcon={false}
										checkedIcon={false}
										boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
										activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
										height={20}
										width={48}
										className="react-switch"
										id="material-switch"
									/>
									<span>&nbsp;Current student</span>
								</div>
							</div>
							<p className="title mb-2">
								Must be the student ID issued by the institute at the time of
								study
							</p>
							<Field className="flex flex-col sm:flex-row" gap-1>
								<label>
									Matric No
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={
											formik.touched.studentId && formik.errors.studentId
												? "student-input err"
												: "student-input"
										}
										name="studentId"
										value={formik.values.studentId}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.studentId && formik.errors.studentId ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{String(formik.errors.studentId)}
										</div>
									) : null}
								</>
							</Field>

							<Field className="flex flex-col sm:flex-row" gap-1>
								<label>
									Course
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={
											formik.touched.course && formik.errors.course
												? "course-input err"
												: "course-input"
										}
										name="course"
										value={formik.values.course}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.course && formik.errors.course ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{String(formik.errors.course)}
										</div>
									) : null}
								</>
							</Field>

							<Field className="flex flex-col sm:flex-row" gap-1>
								<label>
									Qualification
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										className={
											formik.touched.qualification &&
											formik.errors.qualification
												? "qualification-input err"
												: "qualification-input"
										}
										name="qualification"
										placeholder="B.Sc"
										value={formik.values.qualification}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.qualification &&
									formik.errors.qualification ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{String(formik.errors.qualification)}
										</div>
									) : null}
								</>
							</Field>

							<Field className="flex flex-col sm:flex-row" gap-1>
								<label>
									Classificaton
									<span>*</span>
								</label>
								<>
									<input
										type="text"
										placeholder="second class upper"
										className={
											formik.touched.classification &&
											formik.errors.classification
												? "class-input err"
												: "class-input"
										}
										name="classification"
										value={formik.values.classification}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.classification &&
									formik.errors.classification ? (
										<div
											className="error"
											style={{ marginLeft: "-660px", paddingTop: "3px" }}
										>
											{String(formik.errors.classification)}
										</div>
									) : null}
								</>
							</Field>
							{!formik.values.enrollmentStatus && (
								<>
									<Field>
										<label>
											Admission Year<span>*</span>
										</label>
										<>
											<input
												type="text"
												className={
													formik.touched.admissionYear &&
													formik.errors.admissionYear
														? "admission-input err"
														: "admission-input"
												}
												name="admissionYear"
												value={formik.values.admissionYear}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.admissionYear &&
											formik.errors.admissionYear ? (
												<div
													className="error"
													style={{
														marginLeft: "-620px",
														paddingTop: "3px",
													}}
												>
													{String(formik.errors.admissionYear)}
												</div>
											) : null}
										</>
									</Field>
									<Field>
										<label>
											Graduation Year<span>*</span>
										</label>
										<>
											<input
												type="text"
												className={
													formik.touched.graduationYear &&
													formik.errors.graduationYear
														? "graduation-input err"
														: "graduation-input"
												}
												name="graduationYear"
												value={formik.values.graduationYear}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.graduationYear &&
											formik.errors.graduationYear ? (
												<div
													className="error"
													style={{
														marginLeft: "-620px",
														paddingTop: "3px",
													}}
												>
													{String(formik.errors.graduationYear)}
												</div>
											) : null}
										</>
									</Field>
								</>
							)}
							<p className="my-4">
								The reference number will be used to track this case in your
								internal system if you have one
							</p>

							<button
								// disabled={
								//   formik.values.course.length === 0 ||
								//   formik.values.qualification.length === 0 ||
								//   formik.values.classification.length === 0 ||
								//   formik.values.admissionYear.length === 0 ||
								//   formik.values.graduationYear.length === 0 ||
								//   formik.values.studentId.length === 0
								// }
								className={
									formik.values.course.length === 0 ||
									formik.values.qualification.length === 0 ||
									formik.values.classification.length === 0 ||
									(formik.values.enrollmentStatus === false &&
										(formik.values.admissionYear.length === 0 ||
											formik.values.graduationYear.length === 0)) ||
									formik.values.studentId.length === 0
										? "btn notallowed"
										: "btn"
								}
								type="submit"
								onClick={handleDocumentTab}
							>
								Next
								<FontAwesomeIcon
									icon={faLongArrowAltRight}
									style={{ marginRight: "5px", fontSize: "20px" }}
								/>
							</button>
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
									style={{ marginRight: "5px", fontSize: "20px" }}
								/>
								Previous
							</button>
						</FormDiv>
					)}
					{activeTab === "documents" && (
						<FormDiv>
							<Field>
								<p className="upload-text">
									Please upload file in (pdf, jpg,jpeg) format only
								</p>
							</Field>
							<UploadSection>
								<Document className="second-upload">
									<div className="consent">
										<p>Upload certificate or statement of result</p>
										<img src={uparrow} alt="forms_document" />
									</div>

									<div className="file_button_container">
										<input
											type="file"
											name="certImage"
											style={{ cursor: "pointer" }}
											onChange={(event) => {
												formik.setFieldValue(
													"certImage",
													event.currentTarget.files?.[0]
												);
											}}
										/>
									</div>
								</Document>
							</UploadSection>
							{formik?.values?.certImage?.name.length > 1 && (
								<Field>
									<p className="upload-text">
										{formik?.values?.certImage?.name}
									</p>
								</Field>
							)}

							<button
								onClick={submitRequest}
								className="btn submit px-2 !w-auto"
							>
								Submit details
							</button>
							<button
								className="btn-prev"
								type="submit"
								onClick={() => {
									setActiveTab("qualification-details");
									// setPay(true);
								}}
							>
								<FontAwesomeIcon
									icon={faLongArrowAltLeft}
									style={{ marginRight: "5px", fontSize: "20px" }}
								/>
								Previous
							</button>
						</FormDiv>
					)}
				</form>
				{verificationsLength > 1 && (
					<button onClick={() => deleteOneVerification()} className="delete">
						<FontAwesomeIcon icon={faTrash} /> Delete verification
					</button>
				)}
			</FormContainer>
		</SingleCheck>
	);
}

export default VerificationForm;

const SingleCheck = styled.div`
	background: #ffffff 0% 0% no-repeat padding-box;
	padding: 10px 10px 5px 10px;
	margin-top: 10px;
	margin-bottom: 20px;
`;

const UploadSection = styled.div`
	width: 80%;
	padding-left: 40px;
	display: flex;
	@media (max-width: 500px) {
		padding-left: 0px;
		width: 100%;
	}
	.second-upload {
		margin-left: 60px;
		@media (max-width: 500px) {
			margin-left: 0px;
			margin: 0 auto;
			margin-bottom: 50px;
		}
		img {
			margin-left: -20px;
		}
	}
`;

const Document = styled.div`
	height: 190px;
	width: 170px;
	background: #e9eaed 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 10px;
	margin-bottom: 20px;

	.icons {
		height: 17%;
		padding: 0;
		width: 100%;
		display: flex;

		img {
			padding-left: 0px !important;
			margin-bottom: -35px;
		}
	}
	.consent {
		height: 83%;
	}
	p {
		padding-left: 0px !important;
		text-align: center;
		padding-top: 20px !important;
	}
	img {
		padding-left: 65px;
	}
`;

const FormContainer = styled.div`
	margin-top: 15px;
	padding-top: 1rem;
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
	}

	.btn {
		float: right;
		display: flex;
		align-items: center;
		justify-content: space-around;

		/* width: 80px; */
		color: white;
		margin-right: 20px;
		background: #0092e0 0% 0% no-repeat padding-box;
		border-radius: 10px;
		opacity: 1;
		height: 30px;
		outline: none;
		border-color: #0092e0;
		font-family: "poppins";
	}
	.btn-prev {
		display: none;
		@media (max-width: 500px) {
			float: left;
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
		}
	}
	.notallowed {
		cursor: not-allowed;
	}
	.tabs {
		width: 100%;
		min-height: 35px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		/* margin: 0 auto; */
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
				font-family: "poppins";

				&.activeTab {
					border-bottom: 2px solid #0092e0;
					letter-spacing: 0.44px;
					color: #0092e0;
					opacity: 1;
					text-transform: capitalize;
					font-family: "Poppins";
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
		label {
			font-family: "poppins";
			font-weight: bold;
			letter-spacing: 0.32px;
			color: #707070;
			opacity: 1;
		}
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding-left: 15px;
		}
		.enr-status {
			display: flex;
			align-items: center;
			font-family: "poppins";
			letter-spacing: 0.32px;
			color: #707070;
			opacity: 1;
			font-size: 14px;
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
		background: #0092e0 0% 0% no-repeat padding-box;
		border-radius: 10px;
		opacity: 1;
		height: 30px;
		outline: none;
		border-color: #0092e0;
	}
	.submit {
		width: 120px;
	}
	.notallowed {
		/* cursor: not-allowed; */
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
	font-family: MonserratBold;
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
	.err {
		border: 1px solid red !important;
	}
	label {
		span {
			color: red;
		}
	}
	.first-input {
		margin-left: 30px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.middle-input {
		margin-left: 23px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.last-input {
		margin-left: 33px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.date-input {
		margin-left: 21px;
		height: 34px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.ref-input {
		margin-left: 24px;
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
	.course-input {
		margin-left: 52px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.qualification-input {
		margin-left: 25px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.class-input {
		margin-left: 23px;
		@media (max-width: 500px) {
			margin-left: 0px;
		}
	}
	.admission-input {
		margin-left: 8px;
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
		font-family: "poppins";
		font-size: 15px;
		color: #173049;
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
				font-weight: normal;
				font-size: 14px;
				font-family: "poppins";
				font-weight: bold;
				letter-spacing: 0.32px;
				color: #707070;
			}
			&:nth-child(2) {
				padding-left: 105px;
				font-weight: normal;
				font-size: 14px;
				font-family: "poppins";
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
				font-weight: normal;
				font-size: 14px;
				font-family: "poppins";
				font-weight: bold;
				letter-spacing: 0.32px;
				color: #707070;
			}
			&:nth-child(2) {
				padding-left: 40px;
				font-weight: normal;
				font-size: 14px;
				font-family: "poppins";
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
			opacity: 0.6;
			small {
				font: normal normal bold 12px/14px "poppins";
				letter-spacing: 0.24px;
				color: black;
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
		@media (max-width: 400px) {
			overflow-x: scroll;
		}
		@media (max-width: 500px) {
			overflow-x: scroll;
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
				margin-top: 20px;
				input {
					width: 0 !important;
				}
			}
			label {
				@media (max-width: 500px) {
					font-size: 14px;
				}
			}
		}
		.select-schol {
			height: 34px;
			border: 2px solid #e2e2e2;
			outline: none;
			font-family: "poppins";
			font-style: italic;
			color: #707070;
			width: 100%;
			border-radius: 14px;
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
			height: 28px;
			border: 2px solid #e2e2e2;
			outline: none;
			width: 100%;
			border-radius: 14px;
			font-family: "poppins";
			color: #707070;
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
				&:nth-child(1) {
					font-size: 16px;
					text-transform: capitalize;
					font-family: "poppins";
					font-size: 16px;
					letter-spacing: 0.44px;
					color: #173049;
				}
				&:nth-child(2) {
					font-size: 16px;
					font-weight: normal;
					font-family: "poppins";
					color: #707070;
					margin: 0;
				}
			}
			@media (max-width: 500px) {
				margin-left: 20px;
			}
		}
	}
`;
