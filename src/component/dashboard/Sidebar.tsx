import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../asset/CrossCheckLogo.png";
import dashboard from "../../asset/dashboard.svg";
import histry from "../../asset/history.svg";
import logout from "../../asset/logout.svg";
import newVer from "../../asset/new.svg";
import receipt from "../../asset/receipt.svg";
import useUser from "../../hooks/useUser";

function Sidebar() {
	const [show, setShow] = useState(false);
	const user = useUser();

	const logOut = () => {
		localStorage.clear();
		window.location.href = "/login";
	};
	return (
		<Container className="hideshow">
			<LogoSection>
				<img
					src={Logo}
					alt="crosscheck"
					style={{ width: "150px", height: "30px", marginLeft: "-20px" }}
				/>
			</LogoSection>
			<ListSection>
				<ul>
					<Link className="link" to={`/dashboard/${user?.id}`}>
						{" "}
						<img src={dashboard} alt="dash" />
						<li>Dashboard</li>
					</Link>
					<div className="link" onClick={() => setShow(!show)}>
						{" "}
						<img src={newVer} alt="verification" />
						<li>New Verification</li>
						<FontAwesomeIcon
							icon={show ? faAngleDown : faAngleRight}
							style={{ marginLeft: "20px", color: "white", fontSize: "18px" }}
						/>
					</div>
					<div className="options">
						<ul className={show ? "show" : "hide"}>
							<li>
								<Link to="/dashboard/new" className="option">
									Education Check
								</Link>
							</li>
							<li>
								<Link to="/dashboard/transcript" className="option">
									Transcript
								</Link>
							</li>
							{/* <li>
                <Link to="/new" className="option">
                  Identity Verification
                </Link>
              </li> */}
						</ul>
					</div>
					<Link to="/dashboard/history" className="link">
						{" "}
						<img src={histry} alt="history" />
						<li>Verification History</li>
					</Link>
					{/* <Link className="link">
            {" "}
            <img src={contact} alt="account" /> <li>My Account</li>
          </Link> */}
					<Link to="/dashboard/receipts" className="link">
						{" "}
						<img src={receipt} alt="receipt" />
						<li>Receipts</li>
					</Link>
					<button className="link" onClick={logOut}>
						{" "}
						<img src={logout} alt="logout" /> <li>Logout</li>
					</button>
				</ul>
			</ListSection>
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	height: 100vh;
	width: 230px;
	background-color: #0092e0;
	position: fixed;
	z-index: 2;
`;

const LogoSection = styled.div`
	background: #1e2a36;
	width: 230px;
	height: 70px;
	border-bottom-left-radius: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ListSection = styled.div`
	margin-top: 40px;
	ul {
		list-style-type: none;
		padding-inline-start: 20px !important;
	}
	.link {
		padding-bottom: 50px !important;
		text-decoration: none !important;
		display: flex;
		align-items: center;
		cursor: pointer;
		/* opacity: 0.9; */
		&:hover {
			opacity: 1;
		}
	}
	.options {
		.hide {
			display: none;
		}
		.show {
			display: flex;
			flex-direction: column;
			margin-top: -30px;
			padding-bottom: 10px;
			li {
				padding-bottom: 20px;
				cursor: pointer;

				&:hover {
					opacity: 0.5;
				}
			}
			.option {
				color: white;
				text-decoration: none;
			}
		}
	}
	li {
		color: white;
		letter-spacing: 0.4px;
		/* font-size: 14px; */
		font: normal normal normal 14px/16px "poppins";
		letter-spacing: 0.4px;
		color: #ffffff;
		padding-left: 10px;
	}
`;
