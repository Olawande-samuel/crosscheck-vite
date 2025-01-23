import { useRef } from "react";
import generatePDF from "react-to-pdf";
import styled from "styled-components";
import Logo from "../../asset/CrossCheckLogo.png";
import useUser from "../../hooks/useUser";

const Receipt = ({
	receiptDetails,
	userCountry,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	receiptDetails: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	userCountry: any;
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const convertedUsd = 382;
	const user = useUser();

	const toDollar = (amount: number) => {
		return Math.round(Number(amount) / Number(convertedUsd));
	};
	const total = receiptDetails?.ourCharge
		? Number(receiptDetails?.ourCharge) +
		  Number(receiptDetails?.instituteCharge)
		: receiptDetails?.amount;

	return (
		<>
			<PdfWrapper ref={ref}>
				<div className="first-section">
					<div className="img-text">
						<img src={Logo} alt="" />
						<h6 className="!my-[.3em]">Crosscheck</h6>
					</div>
					<h1 className="my-[0.83em] font-bold text-[2em]">Receipt</h1>
				</div>
				<div className="second-section gap-3">
					<div className="customer ">
						<strong>Customer Details</strong>
						<p className="my-4">
							{user?.firstName} {user?.lastName}
						</p>
						{/* <p className="my-4">{user?.organizationName || ""}</p> */}
					</div>
					<div className="invoice !justify-start">
						<div className="date">
							<p className="my-4">
								{" "}
								<strong>Invoice Date</strong>
							</p>
							<p className="my-4">
								{" "}
								<strong>Amount</strong>
							</p>
							<p className="my-4">
								{" "}
								<strong>Transaction id</strong>
							</p>
							<p className="my-4">
								{" "}
								<strong>Request Type</strong>
							</p>
						</div>
						<div className="info">
							<p className="my-4">{receiptDetails?.date}</p>
							{receiptDetails.amount ? (
								userCountry && userCountry === "NG" ? (
									<p className="my-4">&#8358;{receiptDetails?.amount}</p>
								) : (
									<p className="my-4">${toDollar(receiptDetails?.amount)}</p>
								)
							) : userCountry && userCountry === "NG" ? (
								<p className="my-4">
									&#8358;
									{receiptDetails["ourCharge"] &&
										Number(receiptDetails["ourCharge"]) +
											(receiptDetails["instituteCharge"]
												? Number(receiptDetails["instituteCharge"])
												: 0)}
								</p>
							) : (
								<p className="my-4">
									$
									{toDollar(Number(receiptDetails["ourCharge"])) +
										toDollar(
											Number(
												receiptDetails["instituteCharge"]
													? Number(receiptDetails["instituteCharge"])
													: 0
											)
										)}{" "}
								</p>
							)}
							<p className="my-4">{receiptDetails?.tranId || "NA"}</p>
							<p className="my-4">
								{receiptDetails?.amount
									? "Transcript Request"
									: "Education Verification"}
							</p>
						</div>
					</div>
				</div>
				{/* TABLE */}
				<div className="new-table">
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
							<tr key={receiptDetails.institution}>
								<th className="mobile-header">Number</th>
								<td>{receiptDetails.institution}</td>

								<th className="mobile-header">Weight</th>
								{userCountry === "NG" ? (
									<td>
										&#8358;
										{receiptDetails["ourCharge"]
											? receiptDetails["ourCharge"]
											: receiptDetails.amount}
									</td>
								) : (
									<td>
										$
										{toDollar(
											receiptDetails["ourCharge"]
												? receiptDetails["ourCharge"]
												: receiptDetails.amount
										)}
									</td>
								)}
								<th className="mobile-header">Value</th>
								{userCountry === "NG" ? (
									<td>{receiptDetails["instituteCharge"] || "-"}</td>
								) : (
									<td>
										$
										{receiptDetails["instituteCharge"]
											? toDollar(receiptDetails["instituteCharge"])
											: "-"}
									</td>
								)}
							</tr>
							<td></td>
							<td></td>
							<td style={{ color: "black", fontWeight: "bold" }}>TOTAL</td>
							{userCountry === "NG" ? (
								<td style={{ fontWeight: "bold" }}>&#8358;{total}</td>
							) : (
								<td style={{ fontWeight: "bold" }}>${toDollar(total)}</td>
							)}
						</tbody>
					</table>
				</div>
				{/* TABLE */}
			</PdfWrapper>
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
				onClick={() => generatePDF(ref, { filename: "receipt.pdf" })}
			>
				Download as PDF
			</button>
		</>
	);
};

const PdfWrapper = styled.div`
	padding: 1.5rem 18rem 1.5rem 1.5rem;
	@media (max-width: 400px) {
		width: 750px;
	}
	@media (max-width: 400px) {
		width: 750px;
	}

	.new-table {
		margin-top: 10px;
		width: 95% !important;
		box-shadow: none !important;
		/* background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029; *

    /* height: 90%; */
		overflow-x: hidden;
		margin-bottom: 10px;
		padding-bottom: 20px;
		.hide-table {
			display: none;
		}

		table {
			margin: 2rem 0 !important;
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
					background-color: white !important;
				}
				&:hover {
					background-color: #d9f4f2;
				}
			}
		}
	}
	.first-section {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		align-content: center;
		width: 85%;
		@media (max-width: 400px) {
			h1 {
				font-size: 1.5rem;
				margin-left: -2.5rem;
			}
		}
		@media (max-width: 500px) {
			h1 {
				font-size: 1.5rem;
				margin-left: -2.5rem;
			}
		}
	}
	.img-text {
		display: block;
		h6 {
			margin: 0;
			font-size: 1.2rem;
			font-weight: normal;
		}
		p {
			margin: 0;
			margin-top: 5px;
			font-size: 0.8rem;
		}
	}
	.second-section {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		width: 85%;
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
	}
	.date {
		margin-right: 3rem;
		text-align: right;
		p {
			margin-bottom: -0.5rem;
			font-size: 0.8rem;
		}
	}
	.info {
		text-align: left;
		p {
			margin-bottom: -0.5rem;
			font-size: 0.8rem;
		}
	}
`;

export default Receipt;
