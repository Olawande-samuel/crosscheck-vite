import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserTranscript,
	getUserVerification,
} from "../../state/actions/verifications";
import Layout from "./DashboardLayout";
import Receipt from "./Receipt";

import styled from "styled-components";
import useUser from "../../hooks/useUser";
import useUserLocation from "../../hooks/useUserLocation";
import { RootState } from "../../store";
import { toDollar } from "./utils";

const Receipts = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [show, setShow] = useState("close");
	// const convertedUsd = 382;

	const dispatch = useDispatch();
	const { userVerifications, newTranscript } = useSelector(
		(state: RootState) => state.verifications
	);

	const [input] = useState("");
	const [receiptDetails, setReceiptDetails] = useState({});
	const [searchParameter] = useState("status");
	const user = useUser();

	const userCountry = useUserLocation();

	useEffect(() => {
		if (user) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dispatch(getUserTranscript() as any);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dispatch(getUserVerification(user.email) as any);
		}
	}, [dispatch, user]);

	const allHistory = userVerifications.concat(newTranscript);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const filteredItems = allHistory?.filter((history: any) =>
		history[searchParameter]
			?.toLocaleLowerCase()
			.includes(input.toLocaleLowerCase())
	);

	const pageSize = 15;

	const verificationsCount = Math.ceil(filteredItems.length / pageSize);

	// function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	setInput(e.target.value);
	// }

	const truncateString = (str: string) => {
		if (str.length <= 24) {
			return str;
		}
		return str.slice(0, 32) + "...";
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleReceiptDetails = (details: any) => {
		setReceiptDetails(details);
		setShow("open");
	};
	const handleNext = (data: { selected: number }) => {
		return setCurrentPage(data.selected);
	};
	return (
		<Layout>
			<ReceiptBody>
				<div className="new-table">
					{show === "open" && (
						<Receipt
							receiptDetails={receiptDetails}
							userCountry={userCountry}
						/>
					)}
					<div id="tableScroll">
						<table>
							<thead>
								<tr>
									<th>Request type</th>
									<th>Institution</th>
									<th>our charge</th>
									<th>Institute charge</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody className="t-body">
								{filteredItems.length > 0 &&
									filteredItems
										.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										.map((item: any) => (
											<tr
												onClick={() => {
													handleReceiptDetails(item);
												}}
											>
												<td>
													{item?.destination
														? "Transcript Request"
														: "Verification Request"}
												</td>
												<td>{truncateString(item?.institution)}</td>
												{item["ourCharge"] ? (
													userCountry === "NG" ? (
														<td>&#8358;{item["ourCharge"]}</td>
													) : (
														<td>${toDollar(item["ourCharge"])}</td>
													)
												) : item.amount ? (
													userCountry === "NG" ? (
														<td>&#8358;{item.amount}</td>
													) : (
														<td>${toDollar(item.amount)}</td>
													)
												) : (
													<td>-</td>
												)}
												{item["instituteCharge"] ? (
													userCountry === "NG" ? (
														<td>&#8358;{item["instituteCharge"]}</td>
													) : (
														<td>${toDollar(item["instituteCharge"])}</td>
													)
												) : (
													<td>-</td>
												)}
												{item.amount ? (
													userCountry === "NG" ? (
														<td>&#8358;{item.amount}</td>
													) : (
														<td>${toDollar(item.amount)}</td>
													)
												) : userCountry === "NG" ? (
													<td>
														&#8358;
														{item["ourCharge"] &&
															Number(item["ourCharge"]) +
																(item["instituteCharge"]
																	? Number(item["instituteCharge"])
																	: 0)}
													</td>
												) : (
													<td>
														$
														{toDollar(Number(item["ourCharge"])) +
															toDollar(
																Number(
																	item["instituteCharge"]
																		? Number(item["instituteCharge"])
																		: 0
																)
															)}{" "}
													</td>
												)}
												<tr className="space"></tr>
											</tr>
										))}
							</tbody>
						</table>
						<div className="pagination-line">
							<p>
								Showing{" "}
								{
									allHistory.slice(
										currentPage * pageSize,
										(currentPage + 1) * pageSize
									).length
								}{" "}
								of {allHistory.length} of entries
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
				</div>
			</ReceiptBody>
		</Layout>
	);
};

const ReceiptBody = styled.div`
	height: 100%;
	padding: 30px;
	overflow-y: scroll;
	padding-right: 30px;
	background: #fafafb;
	font-family: "poppins";
	::-webkit-scrollbar {
		display: none;
	}
	.new-table {
		margin-top: 1rem;
		width: 100%;
		background: #ffffff;
		padding-top: 1rem;
		border-radius: 7px;
		box-shadow: 0px 0px 10px #00000029;

		/* height: 90%; */
		overflow-x: hidden;
		margin-bottom: 10px;
		padding-bottom: 20px;
		.hide-table {
			display: none;
		}

		table {
			margin: 5rem auto;
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
		}

		.showing {
			font-family: "poppins";
			letter-spacing: 0.44px;
			color: #707070;
			opacity: 1;
		}
	}
`;

export default Receipts;
