import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import DashHeader from "./DashHeader";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: PropsWithChildren) {
	const [show, setShow] = useState(false);

	return (
		<Div>
			<aside> {show && <Sidebar />}</aside>
			<section>
				<Sidebar />
			</section>

			<div className="">
				<DashHeader setShow={setShow} show={show} />
				<Main>{children}</Main>
			</div>
		</Div>
	);
}

export default DashboardLayout;
const Div = styled.div`
	aside {
		@media (min-width: 1024px) {
			display: none;
		}
	}
	section {
		@media (max-width: 1024px) {
			display: none !important;
		}
	}
`;

const Main = styled.main`
	position: fixed;
	right: 0;
	height: calc(100% - 70px);
	bottom: 0;
	width: calc(100% - 230px);

	@media (max-width: 1024px) {
		width: 100%;
	}
`;
