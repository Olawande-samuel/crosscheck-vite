import useFetchInstitution from "@/hooks/useFetchInstitution";
import useUserLocation from "@/hooks/useUserLocation";
import { RootState } from "@/store";
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Institution from "../../asset/institution.svg";

const convertedUsd = 382;

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setSelectedInst: React.Dispatch<React.SetStateAction<any>>;
	setSchCard: React.Dispatch<React.SetStateAction<boolean>>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}

const Institutions = ({ setSelectedInst, setSchCard, formik }: Props) => {
	const [input, setInput] = useState("");
	const [hideTable, setHideTable] = useState(false);
	const [offset, setOffset] = useState(0);
	const dispatch = useDispatch();

	const [country, setCountry] = useState("");
	const { institutions, pageInfo } = useSelector(
		(state: RootState) => state.institutions
	);
	const [byCountryOffset, setByCountryOffset] = useState(0);
	const [byCountryandNameoffset, setByCountryandNameOffset] = useState(0);

	const { fetchInstitution, isLoading, error } = useFetchInstitution();

	useEffect(() => {
		// Fetch by country
		if (country !== "" && input.length === 0) {
			fetchInstitution({ country, offset: byCountryOffset, limit: 15 });
		}
		// fetch by country and Name
		if (country !== "" && input.length > 0) {
			fetchInstitution({
				country,
				offset: byCountryandNameoffset,
				limit: 15,
				name: input,
			});
		}
		if (input.length > 0 && country.length === 0) {
			fetchInstitution({ name: input, offset, limit: 15 });
		}
	}, [
		dispatch,
		fetchInstitution,
		byCountryandNameoffset,
		input,
		offset,
		byCountryOffset,
		country,
	]);

	const userCountry = useUserLocation();

	const pagesCount = pageInfo?.totalPages;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		setHideTable(false);
	};

	const handleSelected = (institute: InstitutionProps) => {
		setSelectedInst(institute);
		formik.setFieldValue("institution", institute.name);
		setHideTable(true);
		setInput(institute.name);
		setSchCard(true);
	};

	const institutionNavs = (data: { selected: number }) => {
		if (country !== "" && input.length === 0) {
			setByCountryOffset(() => Math.ceil(data.selected * 15));
		} else if (country !== "" && input.length > 0) {
			setByCountryandNameOffset(() => Math.ceil(data.selected * 15));
		} else if (input.length > 0 && country.length === 0) {
			setOffset(() => Math.ceil(data.selected * 15));
		}
	};
	const truncateString = (str: string) => {
		if (str.length <= 40) {
			return str;
		}
		return str.slice(0, 40) + "...";
	};

	const toDollar = (amount: number) => {
		return Math.round(Number(amount) / Number(convertedUsd));
	};
	return (
		<SelectSch>
			<div className="req-trans flex-wrap gap-4">
				<img src={Institution} alt="select a sch" />

				<div className="select-inst">
					<p>Select an institute</p>
					<p>Select preferred institute to conduct verification</p>
				</div>
			</div>
			<div className="selects gap-4">
				<div className="institution-wrapper">
					<label style={{ paddingLeft: "5px" }}>SEARCH INSTITUTION</label>
					<input
						type="text"
						className="schl-input placeholder:text-sm flex-1 !px-4 p-1"
						onChange={handleInputChange}
						value={input}
						name="input"
						// disabled={!institutions || institutions.length <= 0}
						placeholder="Search for a school"
					/>
				</div>
				<div className="select-country">
					<label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
					<CountryDropdown
						name="country"
						id="country"
						classes="country border-[2px] border-[#e2e2e2] outline-none rounded-[14px] text-sm font-[poppins] rounded-[14px] !px-4 !py-1"
						valueType="full"
						value={(formik.values.country as string) ?? ""}
						onChange={(val, e) => {
							formik.handleChange(e);
							setCountry(val.toLowerCase());
						}}
						onBlur={formik.handleBlur}
					/>
				</div>
			</div>
			{isLoading ? (
				<div className="flex justify-center my-4">
					<Loader className="animate-spin" />
				</div>
			) : (
				<>
					{error ? (
						<p className="!font-normal !text-sm text-center my-4 !text-red-600 capitalize">
							{error}
						</p>
					) : (
						(input.length > 0 || country.length > 0 || !error) &&
						institutions.length > 0 && (
							<div className="new-table">
								<table
									cellSpacing="0"
									cellPadding="0"
									border={0}
									className={hideTable ? "hide-table" : ""}
								>
									<thead className="table-headers">
										<tr>
											<th>Name</th>
											<th>Country</th>
											<th>Institute charge</th>
											<th>Our charge</th>
										</tr>
									</thead>
									<tbody>
										{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
										{institutions.map((ite: any) => (
											<tr onClick={() => handleSelected(ite)} key={ite.name}>
												<th className="mobile-header">Number</th>
												<td>{truncateString(ite.name)}</td>
												<th className="mobile-header">Market rate</th>
												<td>{ite.country}</td>
												<th className="mobile-header">Weight</th>
												{ite["instituteCharge"] === 0 ? (
													<td>-</td>
												) : userCountry === "NG" ? (
													<td>&#8358;{ite["instituteCharge"] || 0}</td>
												) : (
													<td>${toDollar(ite["instituteCharge"])}</td>
												)}
												<th className="mobile-header">Value</th>
												<td>
													{userCountry === "NG" ? (
														<td>&#8358;{ite["ourCharge"]}</td>
													) : (
														<td>${toDollar(ite["ourCharge"]) || 0}</td>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{!hideTable && (
									<div className="pagination-line">
										<p>
											Showing {institutions.length} of {pageInfo.totalDocs} of
											entries
										</p>

										<ReactPaginate
											previousLabel={
												<FontAwesomeIcon
													className="icon"
													icon={faAngleDoubleLeft}
													style={{ fontSize: "15px" }}
												/>
											}
											nextLabel={
												<FontAwesomeIcon
													className="icon"
													icon={faAngleDoubleRight}
													style={{ fontSize: "15px" }}
												/>
											}
											breakLabel={"..."}
											breakClassName={"break-me"}
											pageCount={pagesCount}
											marginPagesDisplayed={2}
											pageRangeDisplayed={5}
											onPageChange={(e) => institutionNavs(e)}
											containerClassName={"pagination"}
											// subContainerClassName={"pages pagination"}
											activeClassName={"active"}
										/>
									</div>
								)}
							</div>
						)
					)}
				</>
			)}
		</SelectSch>
	);
};

export default Institutions;

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
