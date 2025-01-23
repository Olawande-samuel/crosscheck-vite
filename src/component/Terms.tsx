import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../asset/CrossCheckLogo.png";
import Menu from "../asset/Menu.svg";
import whitelogo from "../asset/whitelogo.png";
import { FooterComponent } from "./LandingPage";

const Terms = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [navbar, setNavbar] = useState(false);
	const handleMenuIcon = () => {
		setShow(!show);
	};
	const changeBackground = () => {
		if (window.scrollY >= 150) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	window.addEventListener("scroll", changeBackground);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<FirstSection>
				<NavBar
					style={{
						position: navbar ? "fixed" : undefined,
						width: navbar ? "100%" : "",
						background: navbar ? "white" : "",
						color: navbar ? "blue" : "white",
						zIndex: "10",
					}}
				>
					<div>
						<img
							className="crosschecklogo"
							src={navbar ? Logo : whitelogo}
							alt=""
						/>
					</div>
					<div className="navs">
						<ul>
							<li
								style={{ color: `${navbar ? "#0092E0" : "white"}` }}
								onClick={() => navigate("/")}
							>
								Home
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="/#coverage"
								>
									{" "}
									Coverage
								</a>
							</li>
							<li style={{ color: `${navbar ? "#0092E0 !" : "white"}` }}>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="/#about"
								>
									{" "}
									About Us
								</a>
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="/#work"
								>
									How it works
								</a>
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="/#contact"
								>
									Contact{" "}
								</a>
							</li>
						</ul>
					</div>

					{!show ? (
						<FontAwesomeIcon
							icon={faBars}
							className="menu-icon"
							onClick={handleMenuIcon}
						/>
					) : (
						""
					)}
				</NavBar>
				<div className={show ? "hide-show" : "hide"}>
					<img src={Menu} alt="close" onClick={handleMenuIcon} />
					<ul>
						<li onClick={handleMenuIcon}>Home</li>
						<li onClick={handleMenuIcon}>
							<a href="#coverage">Coverage</a>{" "}
						</li>
						<li onClick={handleMenuIcon}>
							<a href="#about">About Us</a>
						</li>
						<li onClick={handleMenuIcon}>
							<a href="#testimony">Testimonials</a>
						</li>
						<li onClick={handleMenuIcon}>
							<a href="#contact">Contact us</a>
						</li>
						<li className="divider"></li>
						<li>
							<Link className="auth" to="/login">
								Login
							</Link>
						</li>
						<li>
							<Link className="auth" to="/register">
								Sign up
							</Link>
						</li>
					</ul>
				</div>
				{/* <h1>Terms Of Service</h1> */}
				<Main>
					<h1>Terms of Service</h1>
				</Main>
			</FirstSection>
			<Paragraph>
				<p>
					This Privacy Policy covers CrossCheck's web site, and CrossCheck's
					practices for handling personal information provided to CrossCheck
					over the Internet by the general public using CrossCheck's publicly
					available web site. This Policy also covers personal information
					provided by CrossCheck's clients as well as other individuals who have
					given their written authorization for CrossCheck to conduct a
					background investigation on them, using CrossCheck's online background
					screening solution that is accessible only through an
					access-restricted portion of CrossCheck's web site. CrossCheck will
					collect, store, and use personally identifiable information only in
					compliance with applicable law.
				</p>
				<br />
				<h4>Information Collection</h4> When you browse CrossCheck's publicly
				accessible web site, you do so anonymously. CrossCheck collects
				personally identifiable information from you only if you choose to
				provide this information to us. In some instances, CrossCheck may
				collect non-personal (e.g., aggregate or demographic) data through
				cookies. This information is used to better understand and improve the
				usability, performance and effectiveness of the crosscheck.africa web
				site, as is further described below under "Cookies and Tracking
				Technology".
				<br />
				<br />
				<br /> The types of personal information we may collect about you
				through our publicly accessible web site include the following (should
				you decide to provide such information to CrossCheck): (a) contact and
				identifying information (e.g., name, address, e-mail address, phone
				numbers, employer(s) in connection with your expression of interest in
				receiving information about, or your registering for, CrossCheck
				products or services, newsletters and reports; (b) your resume
				information and employment application information in response to
				CrossCheck job openings; and (c) any other personal information that you
				may voluntarily provide to us in an online form or through an e-mail.
				<br />
				<br /> Access to certain CrossCheck web pages and online services is not
				available to the general public and requires a login code and password
				provided by CrossCheck. Those web pages, and the information
				downloadable to and from those pages, are made available only to clients
				of CrossCheck. On these web pages, CrossCheck collects only information
				that the user voluntarily shares with CrossCheck.
				<br />
				<br /> If you are using this web site to open an employment screening
				account with CrossCheck, we collect the information requested on our
				account application form, including contact information and financial
				information (such as credit card number or billing information). This
				information is used for internal purposes, such as account
				establishment, billing, fulfillment of orders and customer service.
				<br />
				<br />
				<h4>How We Use Your Personal Information </h4> When your personal
				information is collected on CrossCheck's publicly accessible web site,
				CrossCheck will inform you at the point of collection of the purpose for
				the collection. CrossCheck will use your personal information only in
				the way we specify when it is collected unless you consent to a
				different use.
				<br />
				<br /> For example, CrossCheck may use personal information submitted in
				an account application to set up and maintain your account. CrossCheck
				also may use the personal information you provide to answer your
				questions and inquiries, to support CrossCheck's own recruitment
				activities in response to your inquiries into CrossCheck's job postings,
				and to provide newsletters and other information (if any) that you have
				requested.
				<br />
				<br /> <h4>Information Sharing and Disclosure</h4>{" "}
				<p>
					CrossCheck does not sell or rent personal information to third
					parties. CrossCheck will not disclose your personal information to a
					third party without your permission, except in connection with
					performing your background screen for CrossCheck's client or as
					otherwise described in this Privacy Policy.
					<br />
					<br /> CrossCheck may disclose personal information as necessary or
					appropriate in connection with any of the purposes for which we use
					personal information as described above in "How We Use Your Personal
					Information".
					<br />
					<br />
					<br /> When CrossCheck conducts a background screening investigation
					about you, CrossCheck may disclose information that you submit through
					this web site or via e-mail to the CrossCheck client that ordered a
					background screening investigation on you.
					<br />
					<br />
					<br />
					CrossCheck also may disclose your information to certain third parties
					as necessary to conduct the background investigation (such as
					educational institutions, prior employers, courts, law enforcement
					agencies and other persons or entities that may provide or verify
					information about you), as well as to a third-party representative or
					subcontractor authorized by CrossCheck to assist in the background
					screening investigation. These third party representatives and
					subcontractors include service providers that help host or support the
					web site or otherwise provide technical assistance and other data and
					service vendors. CrossCheck transfers to these representatives and
					subcontractors only the personal information they need to deliver to
					CrossCheck (for the benefit of CrossCheck's client) the requested
					product or service. CrossCheck prohibits these third parties from
					using that information for any other purpose. CrossCheck requires that
					these parties maintain commercially reasonable measures to protect the
					confidentiality of your information. CrossCheck also may in good faith
					disclose personal information and any other additional information
					available to CrossCheck for any of the following purposes:
				</p>{" "}
				<p className="list">
					(i) investigate, prevent or take action regarding actual or suspected
					illegal activities or fraud, situations involving potential threats to
					the physical safety of any person, or violations of CrossCheck's terms
					of use;
					<br /> (ii) Respond to or defend against subpoenas, court orders, or
					other legal process;
					<br /> (iii) Establish or exercise CrossCheck's legal rights; or,
					<br /> (iv) Otherwise comply with applicable law.
				</p>
				<br />
				<br /> CrossCheck may acquire other businesses, and other businesses may
				acquire CrossCheck. If that occurs, the information CrossCheck collects
				may be one of the assets examined or transferred as part of the
				transaction. CrossCheck will not permit another business to examine the
				information CrossCheck has collected without a confidentiality agreement
				and only to the extent permitted by law. CrossCheck will not transfer
				the information it has collected unless the recipient agrees to provide
				privacy protections equal to or exceeding those established by this
				Privacy Policy.
				<br />
				<br />
				<h4>Cookies and Tracking Technology</h4>{" "}
				<p>
					{" "}
					CrossCheck's web site may use the standard technology called a
					"cookie" to collect information about how you use the web site.
				</p>
				<br /> A cookie is a small data file that is transferred to your hard
				drive and used for record-keeping purposes. A cookie file can contain
				information such as the URL you came from, your computer's IP address
				(i.e., the Internet address of your computer) and domain type (e.g.,
				.com or .org, etc.), your browser type, the country, state where your
				server is located, the pages of our site that were viewed during a
				visit, and any search terms that you entered on our site.
				<br /> This information is used for internal purposes only, and we do
				not link your URL or IP address to any personal information unless you
				have logged into our web site with a CrossCheck account login and
				password. In addition, CrossCheck’s web site does not allow other
				parties to collect personally identifiable information about an
				individual consumer’s online activities over time and across different
				Web sites when a consumer uses the CrossCheck web site. If you would
				prefer not to receive cookies, you can alter the configuration of your
				browser to refuse cookies, although it is possible that some areas of
				our web site will not function properly if you do so. In particular, you
				may be required to accept cookies in order to complete certain actions
				on CrossCheck's web site.
				<br />
				<br /> CrossCheck’s web site does not currently recognize “do not track”
				signals transmitted by web browsers. Links CrossCheck's web site may
				provide links to third-party web sites. Please be aware that those
				third-party web sites are outside of our control and are not covered by
				this Privacy Policy. If you have questions about how another site uses
				your information, consult that site's privacy statement. Changes to this
				Privacy Policy CrossCheck may revise this policy from time to time. If
				there is a material change to this Privacy Policy, we will post the
				revised policy at this location. CrossCheck will not provide less
				privacy protection, without your consent, to information collected under
				a prior privacy policy. We encourage you to periodically review this
				Privacy Policy to be informed of how CrossCheck is protecting your
				information.
			</Paragraph>
			<Footer>
				<FooterComponent />
			</Footer>
		</div>
	);
};

export default Terms;

const FirstSection = styled.div`
	@media (max-width: 400px) {
		min-width: 60%;
	}
	width: 100%;
	background: #0092e0;
	background: transparent linear-gradient(180deg, #0092e0 0%, #1ec3ff 100%) 0%
		0% no-repeat padding-box;
	box-shadow: 0px 10px 30px #00000029;
	h1 {
		padding-left: 90px;
		font: normal normal bold 28px/36px "poppins";
		letter-spacing: 0px;
		color: #ffffff;
		/* padding-bottom:20px */
	}
	.hide-show {
		@media (min-width: 500px) {
			display: none;
		}
		position: fixed;
		z-index: 50;
		height: 100vh;
		width: 100vw;
		top: 0;

		background: #0092e0 0% 0% no-repeat padding-box;
		opacity: 0.95;
		img {
			float: right;
			padding-top: 30px;
			padding-right: 10px;
		}
		ul {
			display: flex;
			flex-direction: column;
			list-style-type: none;
			margin-top: 70px;
			.divider {
				width: 270px;
				border: 1px solid white;
			}
			li {
				letter-spacing: 1.6px;
				color: #ffffff;
				text-transform: uppercase;
				opacity: 1;
				margin-bottom: 40px;
				a {
					text-decoration: none;
					color: white;
				}
			}
			.auth {
				text-decoration: none;
				color: white;
				font-weight: bold;
			}
		}
	}
	.hide {
		display: none;
	}
`;

const NavBar = styled.nav`
	@media (max-width: 500px) {
		padding: 0px 3px 0px 3px;
		display: flex;
		justify-content: space-between;
		/* max-width: 380px%; */
	}
	display: flex;
	align-items: center;
	.menu-icon {
		display: none;
		@media (max-width: 400px) {
			display: block;
			padding-right: 3px;
			color: white;
			font-size: 28px;
		}
		@media (max-width: 500px) {
			display: block;
			padding-right: 3px;
			color: white;
			font-size: 28px;
		}
	}
	img {
		height: 30px;
		padding-left: 90px;
		@media (max-width: 400px) {
			/* float: left; */
			padding-left: 10px;
			width: 100px;
			height: 25px;
		}
		@media (max-width: 500px) {
			/* float: left; */
			padding-left: 10px;
			width: 100px;
			height: 25px;
		}
	}

	.navs {
		font-family: "poppins";
		@media only screen and (max-width: 400px) {
			display: none;
		}
		@media only screen and (max-width: 500px) {
			display: none;
		}

		ul {
			display: flex;
			padding-left: 350px;
			/* padding-top: 15px; */
			list-style-type: none;
			button {
				margin-top: -5px;
				background: #ff0000;
				border-radius: 3px;
				color: white;
				outline: none;
				cursor: pointer;
				border: 1px solid #ff0000;
				padding: 10px 20px 7px 20px;
			}
			.link-to {
				color: white;
				text-decoration: none;
				font-family: "poppins";
			}
			li {
				margin-right: 50px;
				color: white;
				cursor: pointer;
				font-family: "poppins";
				font-size: 16px;
				a {
					text-decoration: none;
					color: white;
					font-family: "poppins";
					&:hover {
						color: #66c8ed !important;
					}
				}
				&:hover {
					color: #66c8ed !important;
				}
			}
		}
	}
`;
const Paragraph = styled.div`
	font-family: "poppins";
	text-align: left;
	letter-spacing: 0.32px;
	color: #707070;
	font-size: 14px;
	opacity: 1;
	width: 90%;
	margin: 0 auto;
	padding-bottom: 20px;
	h4 {
		color: black;
		margin-bottom: 5px;
	}
	.list {
		padding-left: 20px;
		padding-top: 0px;
	}
`;

const Footer = styled.div`
	@media only screen and (max-width: 400px) {
		display: flex;
		flex-direction: column;
		background: #001538 0% 0% no-repeat padding-box;
		height: 100vh;
	}
	width: 100%;
	/* height: 350px; */
	background: #173049 0% 0% no-repeat padding-box;
	.line {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid grey;
	}
	.bottom-content {
		display: flex;
		justify-content: space-between;
		margin-left: 70px;
		margin-right: 70px;
		.termsof {
			text-decoration: none;
			color: grey;
			cursor: pointer;
		}
		@media (max-width: 400px) {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
		}
		p {
			color: grey;
			font-size: 12px;
		}
		ul {
			display: flex;
			list-style-type: none;

			li {
				margin-right: 7px;
				color: #fff;
				font-size: 12px;
			}
		}
	}
	.contact {
		width: 55%;
		display: flex;
		/* margin: 0 auto; */
		justify-content: space-around;
		padding-top: 40px;
		padding-bottom: 30px;
		margin-left: 550px;
		@media (max-width: 500px) {
			display: block;
			flex-direction: column;
			padding-top: 0px;
			margin-left: 0;
		}
		.email {
			display: flex;
			font-family: "poppins";
			img {
				margin-right: 20px;
			}
			p {
				color: white;
			}
			.text {
				color: grey;
				font-size: 16px;
				@media (max-width: 400px) {
					font-size: 16px;
				}
				@media (max-width: 500px) {
					font-size: 16px;
				}
			}
		}
	}
	.footer-logo {
		/* width: 100%; */
		padding-top: 60px;
		display: flex;
		flex-direction: space-between;
		padding-left: 60px;

		@media (max-width: 400px) {
			padding-left: 15px;
			display: flex;
			/* align-items: flex-start; */

			flex-direction: column;
		}
		@media (max-width: 500px) {
			padding-left: 15px;
			display: flex;
			/* align-items: flex-start; */

			flex-direction: column;
		}
		img {
			@media (max-width: 400px) {
				width: 150px;
				height: 30px;
			}
		}
		img {
			@media (max-width: 500px) {
				width: 150px;
				height: 30px;
			}
		}
		ul {
			margin-left: 350px;
			list-style-type: none;
			display: flex;
			@media (max-width: 400px) {
				display: flex;
				flex-direction: column;
				margin-left: 0px;
				padding: 0 !important;
			}
			@media (max-width: 500px) {
				display: flex;
				flex-direction: column;
				margin-left: 0px;
				padding: 0 !important;
			}
			li {
				margin-right: 15px;
				color: grey;
				font-size: 12px;
				font-family: "poppins";
				@media (max-width: 400px) {
					margin-bottom: 20px;
				}
				@media (max-width: 500px) {
					margin-bottom: 20px;
				}
			}
		}
	}
`;

const Main = styled.main`
	@media (max-width: 400px) {
		padding-top: 20px;
	}
	width: 100%;
	display: flex;
	align-items: flex-start;
`;
