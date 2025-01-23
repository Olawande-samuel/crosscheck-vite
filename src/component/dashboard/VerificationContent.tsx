import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
	getUserTranscript,
	getUserVerification,
} from "../../state/actions/verifications";
import { RootState } from "../../state/reducers";
import FormModal from "../FormModal";

interface IFilteredItem {
	status: string;
	firstName: string;
	lastName: string;
	institution: string;
	date: string;
	_id: string;
	proof: string;
}
const VerificationContent = () => {
	const [currentPage, setCurrentPage] = useState(0);

	const dispatch = useDispatch();
	const { userVerifications, newTranscript } = useSelector(
		(state: RootState) => state.verifications
	);
	const [input, setInput] = useState("");
	const [searchParameter] = useState("status");
	const user = useUser();

	useEffect(() => {
		if (user?.email) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dispatch(getUserTranscript() as any);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dispatch(getUserVerification(user.email) as any);
		}
	}, [dispatch, user?.email]);

	const allHistory = userVerifications.concat(newTranscript);

	// const verificationsNavigation = (e, index) => {
	// 	e.preventDefault();
	// 	if (index < 0 || index >= verificationsCount) {
	// 		return;
	// 	} else {
	// 		setCurrentPage(index);
	// 	}
	// };
	console.log({ allHistory });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const filteredItems = allHistory?.filter((history: any) =>
		history[searchParameter]
			?.toLocaleLowerCase()
			.includes(input.toLocaleLowerCase())
	);

	const pageSize = 10;

	const verificationsCount = Math.ceil(filteredItems.length / pageSize);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCurrentPage(0);
		setInput(e.target.value);
	}

	const truncateString = (str: string) => {
		if (str.length <= 24) {
			return str;
		}
		return str.slice(0, 32) + "...";
	};

	const handleNext = (data: { selected: number }) => {
		return setCurrentPage(data.selected);
	};

	return (
		<div>
			{/* <h6>verification history</h6> */}
			<WallWrapper>
				{/* <Table> */}
				<div className="new-table py-10" id="tableScroll">
					<div className="flex flex-wrap gap-4 px-4 lg:px-10 items-center justify-between mb-6">
						<p className="history">Verification history</p>
						<div className="showing-search">
							<p className="showing">
								Showing ({filteredItems.length}) entries
							</p>
							{searchParameter === "status" && (
								<div className="search-input border-2 rounded-[14px] border-border-color">
									<input
										type="text"
										value={input}
										onChange={handleInputChange}
										placeholder="search by status"
										className="placeholder:text-sm  "
									/>
									<FontAwesomeIcon
										className="icon"
										icon={faSearch}
										style={{ fontSize: "15px" }}
									/>
								</div>
							)}
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Name</th>
								<th>Institution</th>
								<th>Status</th>
								<th>Message</th>
								<th>Proof</th>
							</tr>
						</thead>
						<tbody className="t-body">
							{filteredItems.length > 0
								? filteredItems
										.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
										.map(
											({
												status,
												firstName,
												lastName,
												institution,
												date,
												_id,
												proof,
											}: IFilteredItem) => (
												<tr key={_id}>
													<td>{date}</td>
													<td>{`${firstName}  ${lastName}`}</td>
													<td>{truncateString(institution)}</td>
													<td
														style={{
															color:
																status === "completed"
																	? "#7DC900"
																	: status === "pending"
																	? "red"
																	: "orange",
														}}
													>
														{status}
													</td>
													<td>
														<FormModal id={_id} />
													</td>
													{proof ? (
														<td>
															<a
																target="_blank"
																rel="noopener noreferrer"
																href={proof}
																style={{
																	textDecoration: "none",
																	color: "blue",
																}}
															>
																View
															</a>
														</td>
													) : (
														<td>N/A</td>
													)}
												</tr>
											)
										)
								: ""}
						</tbody>
					</table>
					<div className="pagination-line !mt-6">
						<p>
							Showing{" "}
							{
								filteredItems.slice(
									currentPage * pageSize,
									(currentPage + 1) * pageSize
								).length
							}{" "}
							of {filteredItems.length} of entries
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
							pageCount={verificationsCount}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={(e) => handleNext(e)}
							containerClassName={"pagination"}
							// subContainerClassName={"pages pagination"}
							activeClassName={"active"}
						/>
					</div>
				</div>
				{/* </Table> */}
			</WallWrapper>
		</div>
	);
};

const WallWrapper = styled.div`
	overflow-y: scroll;
	height: 100%;
	padding: 2rem 0;
	/* background: var(--mainWhite); */
	h6 {
		font-family: "poppins";
		letter-spacing: 0px;
		color: #0092e0;
		opacity: 1;
		text-transform: capitalize;
		font-size: 2rem;
		font-weight: normal;
		opacity: 1;
		padding-bottom: -1.5rem;
	}
	.new-table {
		/* margin-top: 10px; */
		width: 100%;
		background: #ffffff 0% 0% no-repeat padding-box;
		border-radius: 7px;
		box-shadow: 0px 0px 10px #00000029;

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
			font-family: "poppins";
			.mobile-header {
				display: none;
			}

			td,
			th {
				padding: 10px;
				@media (max-width: 500px) {
					padding: 9px !important;
				}
			}

			td {
				/* border-left: 1px solid #ecf0f1;
        border-right: 1px solid #ecf0f1; */
			}

			th {
				background-color: #1e2a36;
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
		.history {
			font-family: "poppins";
			font-weight: bold;
			letter-spacing: 0.44px;
			color: #173049;
			opacity: 1;
			@media (max-width: 400px) {
				text-align: left;
			}
		}
		.showing-search {
			display: flex;
			justify-content: space-between;
			align-items: center;

			font-family: "poppins";
			@media (max-width: 400px) {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: left;
				margin-bottom: 1rem;
			}
			@media (max-width: 500px) {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: left;
				margin-bottom: 1rem;
			}

			.showing {
				font-family: "poppins";
				letter-spacing: 0.44px;
				color: #707070;
				opacity: 1;

				@media (max-width: 400px) {
					margin-left: 0;
				}
				@media (max-width: 500px) {
					margin-left: 0;
				}
			}
			.search-input {
				position: relative;
				padding: 0.5rem;

				input {
					height: 1rem;
					padding: 0.2rem;
					outline: none;
					@media (max-width: 400px) {
						/* margin-bottom: 1rem; */
						margin-left: 0;
					}
					@media (max-width: 500px) {
						/* margin-bottom: 1rem; */
						margin-left: 0;
					}
				}
				.icon {
					position: absolute;
					top: 30%;
					right: 5%;
					opacity: 0.7;
					color: #2c3e50;
				}
			}
		}
	}
`;

export default VerificationContent;
