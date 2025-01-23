import React from "react";
import styled from "styled-components";
import TopHeader from "./TopHeader";

interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
}

const DashHeader = ({ setShow, show }: Props) => {
	return (
		<Header className="dash-header py-3">
			<TopHeader show={show} setShow={setShow} />
		</Header>
	);
};

export default DashHeader;

const Header = styled.div`
	width: calc(100% - 230px);
	top: 0;
	right: 0;
	position: fixed;
	font-family: "Rubik", sans-serif;
	z-index: 1;
	@media (max-width: 1024px) {
		width: 100%;
	}
`;
