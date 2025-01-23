import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../api/endpoints";
import Activated from "../../asset/activated.svg";

function AccountVerification() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const { data, isLoading } = useQuery({
		queryFn: () => API.verifyUser({ token: token as string }),
		queryKey: ["verify user"],
		enabled: !!token,
		staleTime: Infinity,
	});

	console.log(data);

	if (isLoading) {
		return (
			<div className="flex justify-center py-5">
				<Loader className="animate-spin text-[#0092e0]" />
			</div>
		);
	}

	return (
		<Div>
			<div className="bg-white shadow-md py-6 rounded-[25px] w-full max-w-[400px] flex flex-col items-center">
				<img
					src={Activated}
					alt="activated"
					className="mx-auto mb-8"
					width={154}
					height={154}
				/>
				<p className="mb-4 capitalize text-2xl font-['poppins'] tracking-normal text-[#707070]">
					Account activated
				</p>
				<Link
					to="/login"
					className="font-['poppins'] font-bold  capitalize no-underline bg-[#0092e0] text-white tracking-[0.32px] text-sm rounded-[30px] px-[25px] py-[15px]  "
				>
					Log in
				</Link>
			</div>
		</Div>
	);
}

export default AccountVerification;
const Div = styled.div`
	width: 800px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	@media (max-width: 400px) {
		width: 300px;
	}
	@media (max-width: 500px) {
		width: 400px;
	}
	/* text-align: center; */
`;

// const Container = styled.div`
// 	width: 400px;
// 	background: #ffffff 0% 0% no-repeat padding-box;
// 	border-radius: 25px;
// 	height: "fit-content";
// 	box-shadow: 0px 0px 5px #00000017;
// 	text-align: center;
// 	@media (max-width: 400px) {
// 		width: 300px;
// 		img {
// 			width: 150px;
// 		}
// 	}
// 	@media (max-width: 500px) {
// 		width: 350px;
// 		img {
// 			width: 180px;
// 		}
// 	}
// 	p {
// 		text-transform: capitalize;
// 		font-size: 24px;
// 		font-family: "poppins";
// 		letter-spacing: 0px;
// 		color: #707070;
// 		opacity: 1;
// 		font-weight: normal;
// 	}
// 	.link {
// 		font-family: "poppins";
// 		font-weight: bold;
// 		text-transform: capitalize;
// 		text-decoration: none;
// 		background: #0092e0;
// 		letter-spacing: 0.32px;
// 		color: #ffffff;
// 		opacity: 1;
// 		font-size: 14px;
// 		border-radius: 3px;
// 		padding: 15px 25px;
// 		border-radius: 30px;
// 	}
// `;
