import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";
import styled from "styled-components";
import Avatar from "../asset/Avatar.png";
import Computer from "../asset/Computer.png";
import Logo from "../asset/CrossCheckLogo.png";
import Menu from "../asset/Menu.svg";
import ava1 from "../asset/ava1.png";
import ava2 from "../asset/ava2.png";
import bertha from "../asset/bertha.png";
import cash from "../asset/cash.svg";
import WhiteCrosscheck from "../asset/crosscheckTMWhite.svg";
import crosscheckTm from "../asset/crosscheckTm.svg";
import enquiry from "../asset/enq.svg";
import insight from "../asset/insight.svg";
import intelligence from "../asset/intelligence.svg";
import knowledge from "../asset/knowledge.svg";
import Mail from "../asset/mail.svg";
import imgUrl from "../asset/map.svg";
import pay from "../asset/pay_send.svg";
import phone from "../asset/phone.svg";
import planet from "../asset/planet.svg";
import register from "../asset/reg.svg";
import service from "../asset/serv.svg";
import verified from "../asset/verified.svg";
export const FooterComponent = () => {
	const navigate = useNavigate();
	const today = new Date();
	const year = today.getFullYear();
	const location = useLocation();

	const topFunction = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		navigate("/");
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Footer>
			<div className="main-footer-section">
				<div>
					<img src={Logo} alt="crosscheck" />
				</div>
				<div className="info-section">
					<ul>
						<li onClick={() => topFunction()} style={{ cursor: "pointer" }}>
							HOME
						</li>
						<li>
							{" "}
							<a href={location.pathname === "/terms" ? "/#about" : "#about"}>
								ABOUT
							</a>
						</li>
						<li>
							{" "}
							<a
								href={
									location.pathname === "/terms" ? "/#coverage" : "#coverage"
								}
							>
								{" "}
								COVERAGE
							</a>
						</li>
						<li>
							{" "}
							<a
								href={
									location.pathname === "/terms"
										? "/#testimonies"
										: "#testimonies"
								}
							>
								TESTIMONIALS
							</a>
						</li>
						<li>CONTACT US</li>
					</ul>
					<div className="contact">
						<div className="email">
							<a
								href="mailto:support@crosscheck.africa"
								style={{ cursor: "pointer" }}
							>
								<img src={Mail} alt="mail" style={{ cursor: "pointer" }} />
							</a>
							<div>
								<p>Email</p>
								<a className="text" href="mailto:support@crosscheck.africa">
									support@crosscheck.africa
								</a>
							</div>
						</div>
						<div></div>

						<div className="email">
							<a
								href="tel:+2348134662307"
								className="text"
								style={{ cursor: "pointer" }}
							>
								<img src={phone} alt="mail" style={{ cursor: "pointer" }} />
							</a>
							<div className="text">
								<p>Phone</p>
								<a
									href="tel:+2348134662307"
									style={{ cursor: "pointer" }}
									className="text"
								>
									08134662307
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="contact">
        <ul style={{display:'flex', alignItems:'center',listStyleType:'none'}}>
        <li>
        <a href="https://www.linkedin.com/company/crosscheckit/" target="_blank" rel="noopener noreferrer">
              <i
                className="fa fa-linkedin"
                aria-hidden="true"
                style={{ fontSize: "24px",color:'#0092e0', marginRight:'20px',cursor:'pointer' }}
              ></i>
              </a>
              </li>
              &nbsp; &nbsp;
              <li>
              <a href="https://www.facebook.com/crosscheck.africa/" target="_blank" rel="noopener noreferrer">
              <i
                className="fa fa-facebook"
                aria-hidden="true"
                style={{ fontSize: "24px",color:'#0092e0', marginRight:'20px', cursor:'pointer'  }}
              ></i>
              </a>
            </li>&nbsp; &nbsp;
            <li>
              <a href="https://instagram.com/crosscheck.africa?igshid=hh58fx3b9g1o" target="_blank" rel="noopener noreferrer">
              <i
                className="fa fa-instagram"
                aria-hidden="true"
                style={{ fontSize: "24px",color:'#0092e0', cursor:'pointer' }}
              ></i></a>
            </li>
          </ul>
         */}
			<div></div>

			<div className="line"></div>
			<div className="bottom-content items-center">
				<p className="py-4">© {year} Crosscheck. All Rights Reserved</p>
				<ul>
					<li>Privacy Policy</li>
					<li>
						{location.pathname !== "/terms" && (
							<Link to="/terms" className="termsof">
								{" "}
								Terms of Service
							</Link>
						)}
					</li>
				</ul>
			</div>
		</Footer>
	);
};

const LandingPage = () => {
	const [show, setShow] = useState(false);
	const [navbar, setNavbar] = useState(false);
	const [testimonyIndex, setTestimonyIndex] = useState(0);

	const navigate = useNavigate();

	const topFunction = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		navigate("/");
	};

	const testimonies = [
		{
			text: "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
			author: {
				name: "Adetola Akere",
				organisation: "Lambda School",
				position: "Student",
			},
			avatar: ava1,
		},
		{
			text: "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
			author: {
				name: "Mike Attara",
				organisation: "Lambda School",
				position: "Student",
			},
			avatar: ava2,
		},
		{
			text: "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
			author: {
				name: "Babatunde",
				organisation: "Paystack",
				position: "Software Engineer",
			},
			avatar: Avatar,
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setTestimonyIndex((index) => (index + 1) % testimonies.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [testimonies.length]);

	const handleMenuIcon = () => {
		setShow(!show);
		topFunction();
	};

	const changeBackground = () => {
		if (window.scrollY >= 420 && window.innerWidth > 600) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	window.addEventListener("scroll", changeBackground);

	const checkHeight = () => {
		if (window.scrollY >= 2500) {
			return true;
		}
		// else {
		//   return false
		// }
	};

	const testimony = testimonies[testimonyIndex];

	return (
		<div>
			<FirstSection>
				<NavBar
					style={{
						position: navbar ? "fixed" : undefined,
						width: navbar ? "100%" : undefined,
						background: navbar ? "white" : undefined,
						color: navbar ? "blue" : "white",
						zIndex: "10",
						padding: navbar ? "10px 20px" : "10px 20px 10px 67px",
					}}
				>
					<div>
						<img
							className="crosschecklogo"
							src={navbar ? crosscheckTm : WhiteCrosscheck}
							alt=""
						/>
					</div>
					<div className="navs">
						<ul
							style={{
								marginRight: `${navbar ? "40px" : ""}`,
								padding: `${navbar ? "0" : ""}`,
							}}
						>
							<li
								style={{ color: `${navbar ? "#0092E0" : "white"}` }}
								onClick={() => topFunction()}
							>
								Home
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="#coverage"
								>
									{" "}
									Coverage
								</a>
							</li>
							<li style={{ color: `${navbar ? "#0092E0 !" : "white"}` }}>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="#about"
								>
									{" "}
									About Us
								</a>
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="#work"
								>
									How it works
								</a>
							</li>
							<li>
								<a
									style={{ color: `${navbar ? "#0092E0" : "white"}` }}
									href="#contact"
								>
									Contact{" "}
								</a>
							</li>
							<button>
								<Link className="link-to" to="/login">
									LOGIN
								</Link>
							</button>
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
					<img src={Menu} alt="close icon" onClick={handleMenuIcon} />
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
				<Main>
					<div className="intro-text">
						<h1 className="font-[orkneyLight]">
							Your unfair
							<br /> advantage to get
							<br />
							ahead starts <span className="here">here</span>
						</h1>
						<h2>
							Your unfair advantage to get ahead starts{" "}
							<h1 className="here">here</h1>{" "}
						</h2>
						<p>
							We are Africa’s most comprehensive online, automated verification
							service for academic qualifications.
						</p>
						<div className="register">
							<Link className="reg" to="/register">
								<button>Sign Up Now</button>
							</Link>
							<a href="#work" className="works">
								<button type="button"> How it works</button>
							</a>
						</div>
					</div>
					<img src={Computer} alt="crosscheck header" />
				</Main>
			</FirstSection>
			<a id="about">
				<About>
					<h1 className="font-bold my-[0.83em]">
						A few things you should know about us
					</h1>
					<h3 className="about-us">About Us</h3>
					<div className="cardss">
						<div className="card">
							<h3 className="font-bold">OUR VISION</h3>
							<div className="line"></div>
							<p>
								To be Africa's leading expert in background checks industry.
							</p>
						</div>
						<div className="card">
							<h3 className="font-bold">WHO WE ARE</h3>
							<div className="line"></div>
							<p>
								CrossCheck is Africa’s most comprehensive online, automated
								verification service for academic qualifications and
								professional body memberships.
							</p>
						</div>
						<div className="card">
							<h3 className="font-bold">OUR MISSION</h3>
							<div className="line"></div>
							<p>
								We are committed to providing innovative solutions & services to
								our clients for better engagement & hiring decisions.
							</p>
						</div>
					</div>
					<div className="image-icons mt-10">
						<div className="sec">
							<img src={insight} alt="insight" />
							<p>Global Research</p>
						</div>
						<div className="sec">
							<img src={planet} alt="planet" />
							<p>Local Insights</p>
						</div>
						<div className="sec">
							<img src={intelligence} alt="crosscheck | intelligence" />
							<p>Expertise and Knowledge</p>
						</div>
						<div className="sec">
							<img src={knowledge} alt="crosscheck knowledge" />
							<p>Primary source verifications</p>
						</div>
						<div className="sec">
							<img src={verified} alt="verified crosscheck" />
							<p>Technologically relevant</p>
						</div>
					</div>
				</About>
			</a>

			<a id="work">
				<Div>
					<h2 className="font-bold my-[0.83em] text-3xl">How it Works</h2>
					<p>
						Our clients can order verifications anytime and our research teams
						start working on the same from multiple locations in highly
						efficient and effective ways.
					</p>
				</Div>
			</a>
			<Blocks>
				<div className="blocks">
					<img src={register} alt="register crosscheck account" />
					<h4 className="font-bold my-[1.33em]">Register</h4>
					<p>
						Create an Individual or Organization Account & activate via email
						within a few minutes.
					</p>
				</div>
				<div className="blocks">
					<img src={service} alt="regi" />
					<h4 className="font-bold my-[1.33em]">Select Service</h4>
					<p>
						Select from a host of services ranging from Educational Checks to
						Identity Verification.
					</p>
				</div>
				<div className="blocks">
					<img src={enquiry} alt="enq" />
					<h4 className="font-bold my-[1.33em]">Search institution</h4>
					<p>
						Initiate a quick, seamless search of the institution you wish to
						conduct a check with.
					</p>
				</div>
				<div className="blocks">
					<img src={enquiry} alt="enq" />
					<h4 className="font-bold my-[1.33em]">Enter Enquiry Details</h4>
					<p>Enter all the necessary verification details.</p>
				</div>

				<div className="blocks">
					<img src={cash} alt="pay" />
					<h4 className="font-bold my-[1.33em]">Pay</h4>
					<p>Pay the rate</p>
				</div>
				<div className="blocks">
					<img src={pay} alt="paysend" />
					<h4 className="font-bold my-[1.33em]">Send</h4>
					<p>Submit you request and await feedback.</p>
				</div>
			</Blocks>
			<a id="testimonies">
				<Testimonies>
					<h2 className="font-bold my-[0.83em] text-2xl">
						What people say about us
					</h2>
					<p>
						We are quite fond of the people and organizations we serve, here's
						what they have to say about us.
					</p>
					<div className="testimonies">
						<div className="testimony">
							<p>
								Just used CrossCheck for the first time, and It’s was amazing! I
								was able to order my transcript almost immediately and before
								every other applicant.
							</p>
							<div className="profile">
								<img src={ava2} alt="crosscheck user" />
								<p>John Kumuyi</p>
								<p
									className="role"
									style={{
										fontWeight: "100",
									}}
								>
									Herculanum
								</p>
							</div>
						</div>
						<div className="testimony">
							<p>
								Hiring exercises can be tedious. CrossCheck helps us optimize
								candidate verifications during hiring processes, while still
								staying on top of things.
							</p>
							<div className="profile">
								<img src={ava1} alt="crosscheck user" />
								<p>Edet Michael</p>
								<p
									className="role"
									style={{
										fontWeight: "100",
									}}
								>
									Confetti Group
								</p>
							</div>
						</div>
						<div className="testimony">
							<p>
								For the past few weeks, our small team has used CrossCheck to
								conduct seamless verifications without the hassle of multiple
								phone calls and emails.
							</p>
							<div className="profile">
								<img src={bertha} alt="avatar" />
								<p>Bertha Johnson</p>
								<p
									className="role"
									style={{
										fontWeight: "100",
									}}
								>
									Applicant
								</p>
							</div>
						</div>
					</div>

					{/* MOBILE TESTIMONIES */}
					<Slides>
						<div className="w3-container w3-center w3-animate-left">
							<p className="testimony-test">{testimony.text}</p>
							<div className="profile">
								<img src={testimony?.avatar} alt="crosscheck user" />
								<span>{testimony?.author?.name}</span>
								<span>{`${testimony?.author?.position}, ${testimony?.author?.organisation}`}</span>
							</div>
						</div>
					</Slides>
					<div className="circles">
						{testimonies.map((_, i) => (
							<div
								key={i}
								onClick={() => setTestimonyIndex(i)}
								className={`circle ${testimonyIndex === i ? "active" : ""}`}
							/>
						))}
					</div>
				</Testimonies>
			</a>
			<a id="coverage">
				<Cover>
					<h2 className="font-bold my-[0.83em] text-2xl">We Cover Over</h2>
					<div className="cover">
						<div className="count" data-target="100">
							{/* <h2 className="counter" >0</h2> */}
							<CountUp
								start={0}
								end={48}
								duration={5}
								onStart={checkHeight}
								className="counter"
							>
								{({ countUpRef, start }) => (
									<VisibilitySensor onChange={start} delayedCall={true}>
										<span ref={countUpRef} className="counter" />
									</VisibilitySensor>
								)}
							</CountUp>
							<p>COUNTRIES</p>
						</div>

						<div className="inst">
							{/* <h2 className="counter" >200</h2> */}
							<CountUp
								start={0}
								end={1845}
								duration={5}
								onStart={checkHeight}
								className="counter"
							>
								{({ countUpRef, start }) => (
									<VisibilitySensor onChange={start} delayedCall={true}>
										<span ref={countUpRef} className="counter" />
									</VisibilitySensor>
								)}
							</CountUp>
							<p>INSTITUTIONS</p>
						</div>
					</div>
				</Cover>
			</a>
			<a id="contact">
				<FooterComponent />
			</a>
		</div>
	);
};

export default LandingPage;

const Slides = styled.div`
	display: none;

	@media (max-width: 400px) {
		display: flex;

		.w3-container {
			display: flex;
			flex-direction: column;

			.testimony-test {
				background: white;
				color: black;
				width: 100%;
				padding-top: 10px;
				padding-bottom: 30px;
				border-radius: 4px;
			}
			.profile {
				position: relative;
				top: -40px;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 70px;
					height: 70px;
				}
			}
		}
	}
	@media (max-width: 500px) {
		display: flex;

		.w3-container {
			display: flex;
			flex-direction: column;

			.testimony-test {
				background: white;
				color: black;
				margin: 0 auto;
				width: 95%;
				padding-top: 10px;
				padding-bottom: 30px;
				border-radius: 4px;
			}
			.profile {
				position: relative;
				top: -30px;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 70px;
					height: 70px;
				}
			}
		}
	}
`;

const Footer = styled.div`
	.main-footer-section {
		display: flex;
		justify-content: space-between;
		padding: 2rem 4rem;
		align-items: center;
		.info-section {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			ul {
				list-style-type: none;
				display: flex;
				gap: 0 15px;
				margin: 0 0 30px 0;
				padding: 0;
				li {
					font-family: "poppins";
					color: #fff;
					@media (max-width: 800px) {
						margin-top: 20px;
					}
					a {
						text-decoration: none;
						color: #fff;
					}
				}
				@media (max-width: 600px) {
					flex-direction: column;
				}
			}
			@media (max-width: 800px) {
				align-items: flex-start;
			}
		}
		.contact {
			display: flex;
			gap: 30px;
			@media (max-width: 600px) {
				flex-direction: column;
				gap: 15px;
			}

			.email {
				display: flex;
				font-family: "poppins";
				align-items: center;
				img {
					margin-right: 20px;
				}
				p {
					color: white;
					margin: 0;
					margin-bottom: 10px;
				}
				.text {
					color: #fff;
					font-size: 16px;
					text-decoration: none;
					@media (max-width: 400px) {
						font-size: 16px;
					}
					@media (max-width: 500px) {
						font-size: 16px;
					}
				}
			}
		}
		@media (max-width: 800px) {
			flex-direction: column;
			align-items: flex-start;
			padding: 2rem;
		}
	}
	@media only screen and (max-width: 400px) {
		display: flex;
		flex-direction: column;
		background: #173049 0% 0% no-repeat padding-box;
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
		@media (max-width: 800px) {
			margin-left: 0px;
			margin-right: 0px;
		}
		.termsof {
			text-decoration: none;
			color: #fff;
			cursor: pointer;
			font-family: "poppins";
		}
		@media (max-width: 800px) {
			margin-left: 20px;
			margin-right: 20px;
		}
		@media (max-width: 400px) {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
		}
		p {
			color: grey;
			font-size: 12px;
			font-family: "poppins";
		}
		ul {
			display: flex;
			list-style-type: none;
			padding: 0;

			li {
				margin-right: 7px;
				color: #fff;
				font-size: 12px;
				font-family: "poppins";
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
			@media (max-width: 800px) {
				margin-left: 20px;
				/* display: flex;
        flex-direction: column;
        margin-left: 0px;
        padding: 0 !important; */
			}
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

const Cover = styled.div`
	width: 100%;
	text-align: center;
	padding-top: 100px;
	padding-bottom: 100px;
	background: url(${imgUrl});
	h2 {
		font-family: "poppins";
	}
	.cover {
		display: flex;
		justify-content: center;
		p {
			font-family: "poppins";
		}
		@media (max-width: 400px) {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 70px;
			padding-bottom: 70px;
		}
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 70px;
			padding-bottom: 70px;
		}
		.counter {
			color: #0092e0;
			font-size: 42px;
			font-weight: bolder;
			font-family: "poppins";
			border-bottom: 1px solid gray;
		}
		.count {
			padding-right: 250px;

			@media (max-width: 400px) {
				padding-right: 0px;
				margin-bottom: 50px;
			}
			@media (max-width: 500px) {
				padding-right: 0px;
				margin-bottom: 50px;
			}
		}
	}
`;

const Testimonies = styled.div`
	width: 100%;
	height: 600px;
	color: white;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 60px;
	background: transparent linear-gradient(308deg, #0092e0 0%, #1ec3ff 100%) 0%
		0% no-repeat padding-box;
	.circles {
		display: none;
		@media (max-width: 400px) {
			display: flex;
			margin-top: 30px;
		}
		@media (max-width: 500px) {
			display: flex;
			margin-top: 30px;
		}

		.circle {
			border: 1px solid white;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 15px;
		}
		.active {
			background: white;
		}
	}
	@media (max-width: 400px) {
		padding-bottom: 40px;
		height: auto !important;
	}
	@media (max-width: 500px) {
		padding-bottom: 40px;
		height: auto !important;
	}
	p {
		width: 40%;
		text-align: center;
		letter-spacing: 0px;
		font-family: "poppins";
		font-size: 16px;
		color: #ffffff;
		opacity: 0.9;
		padding-bottom: 60px;
		@media (max-width: 400px) {
			width: 90%;
		}
		@media (max-width: 500px) {
			width: 90%;
		}
	}
	h2 {
		font-family: "poppins";
		letter-spacing: 0.26px;
		word-spacing: 2px;
		color: #ffffff;
		opacity: 1;
	}

	.testimonies {
		display: flex;
		justify-content: space-between;
		width: 90%;
		@media (max-width: 800px) {
			width: 98%;
		}
		@media (max-width: 400px) {
			display: none;
		}
		@media (max-width: 500px) {
			display: none;
		}

		.testimony {
			width: 300px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* height: 120px; */
			background: #ffffff 0% 0% no-repeat padding-box;
			padding: 10px;
			border-radius: 8px;
			@media (max-width: 800px) {
				width: 200px;
			}
			p {
				font-family: "poppins";
				letter-spacing: 0px;
				color: #676f79;
				opacity: 1;
			}
			.profile {
				margin-bottom: -90px;
				padding-top: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				p {
					width: 100%;
					color: white;
					font-weight: 500;
				}
				.role {
					color: #fff;
				}
				img {
					width: 70px;
					height: 70px;
					@media (max-width: 500px) {
						display: block;
					}
				}
			}
			p {
				letter-spacing: 0px;
				color: #676f79;
				width: 100%;
				padding: 7px 7px 0px 7px;
				text-align: center;
				margin: 0;
				font-size: 14px;
				font-family: "poppins";
			}
		}
	}
`;

const Blocks = styled.div`
	width: 85%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 0 auto;
	margin-top: 30px;
	@media (max-width: 400px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 500px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.blocks {
		@media (max-width: 400px) {
			width: 100%;
			margin-bottom: 40px;
		}
		@media (max-width: 500px) {
			width: 100%;
			margin-bottom: 40px;
		}
		width: 31.33%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 60px;
		padding: 0;
		padding-top: 20px;
		padding-bottom: 20px;
		&:hover {
			border: 1px solid #4a86ff;
		}
		h4 {
			font-family: "poppins";
			font-size: 21px;
			margin-top: 30px;
			margin-bottom: 20px;
			color: #333333;
			@media (max-width: 800px) {
				text-align: center;
			}
		}
		p {
			width: 85%;
			text-align: center;
			color: #676f79;
			font-family: "poppins";
			font-size: 14px;
			opacity: 0.8;
			@media (max-width: 400px) {
				line-height: 1.6;
			}
			@media (max-width: 500px) {
				line-height: 1.6;
			}
		}
	}
`;
const Div = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;

	align-items: center;
	margin: 0 auto;
	padding: 70px 0 20px 0 /* margin-top: 70px;
  margin-bottom: 20px; */ h2 {
		font-family: "poppins";
		color: #173049;
		margin: 0;
	}
	p {
		width: 60%;
		text-align: center;
		color: #676f79;
		font-family: "poppins";
		font-size: 14px;
		opacity: 0.8;
		line-height: 1.7;
		@media (max-width: 400px) {
			width: 100%;
		}
		@media (max-width: 500px) {
			width: 100%;
		}
	}
`;

const About = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	align-items: center;
	margin: 0 auto;
	margin-top: 20px;
	@media (max-width: 800px) {
		width: 98%;
	}
	.about-us {
		@media (min-width: 500px) {
			display: none;
		}
	}
	.image-icons {
		@media (max-width: 400px) {
			display: none;
		}
		@media (max-width: 500px) {
			display: none;
		}
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 40px;

		.sec {
			display: flex;
			flex-direction: column;
			font-family: "poppins";
			align-items: center;
			p {
				font-family: "poppins";
				color: #676f79;
				opacity: 0.8;
				font-size: 14px;
			}
		}
	}
	.cardss {
		display: flex;
		width: 90%;
		justify-content: space-between;
		@media (max-width: 800px) {
			width: 100%;
			display: flex;
		}
		@media (max-width: 400px) {
			display: flex;
			flex-direction: column;
			width: auto;
		}
		@media (max-width: 500px) {
			display: flex;
			flex-direction: column;
			width: auto;
		}
		.card {
			@media screen and (max-width: 800px) and (min-width: 700px) {
				width: 240px;
			}
			@media (max-width: 400px) {
				margin-bottom: 25px;
			}
			@media (max-width: 500px) {
				margin-bottom: 25px;
			}
			background: #ffffff 0% 0% no-repeat padding-box;
			border-radius: 7px;
			box-shadow: 0px 0px 10px #00000029;
			min-height: 275px;
			width: 300px;
			display: flex;
			flex-direction: column;

			&:hover {
				box-shadow: 0px 12px 30px 0px rgba(0, 0, 0, 0.2);
				transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
				h3 {
					color: #0092e0;
				}
			}
			.line {
				border-bottom: 1px solid grey;
				width: 80%;
				margin: 0 auto;
				margin-bottom: 30px;
			}
			p {
				width: 85%;
				color: #173049;
				font-size: 14px;
				text-align: justify;
				margin-left: 30px;
				font-family: "poppins";
				font-weight: 600;
				@media (max-width: 400px) {
					font-size: 16px;
					line-height: 1.4;
				}
				@media (max-width: 500px) {
					font-size: 16px;
					line-height: 1.4;
				}
			}
			h3 {
				letter-spacing: 0.6px;
				color: #173049;
				text-transform: uppercase;
				opacity: 1;
				margin-left: 30px;
				margin-top: 30px;
				font-family: "poppins";
				font-size: 24px;
			}
		}
	}
	@media (max-width: 400px) {
		width: 100%;
	}
	@media (max-width: 500px) {
		width: 100%;
	}
	h2 {
		display: none;
		@media (max-width: 400px) {
			display: block;
			font-size: 30px;
			font-weight: bolder;
		}
		@media (max-width: 500px) {
			display: block;
			font-size: 30px;
			font-weight: bolder;
		}
	}
	@media (max-width: 400px) {
		margin-left: 0px;
		margin-top: 30px;
	}
	@media (max-width: 500px) {
		margin-left: 0px;
		margin-top: 30px;
	}
	h1 {
		font-family: "poppins";
		font-size: 30px;
		padding: 45px 0 30px 0;
		/* margin-top: 45px;
    margin-bottom: 30px; */
		@media (max-width: 400px) {
			display: none;
		}
	}
	h1 {
		@media (max-width: 500px) {
			display: none;
		}
	}

	p {
		color: #676f79;
		/* @media (max-width: 400px) {
      display: none;
    } */
	}
	.tabs {
		display: flex;
		justify-content: space-between;
		width: 70%;
		@media (max-width: 400px) {
			display: none;
		}
		@media (max-width: 500px) {
			display: none;
		}
		h3 {
			letter-spacing: 0.6px;
			color: #173049;
			cursor: pointer;

			&:nth-child(2) {
				color: #0092e0;
				border-bottom: 4px solid #0092e0;
			}
		}
	}
	p {
		width: 70%;
		text-align: center;
	}
`;

const FirstSection = styled.div`
	@media (max-width: 400px) {
		min-width: 60%;
		height: 700px;
		margin-bottom: 30px;
	}
	width: 100%;
	height: 100vh;
	background: #0092e0;
	background: transparent linear-gradient(180deg, #0092e0 0%, #1ec3ff 100%) 0%
		0% no-repeat padding-box;
	box-shadow: 0px 10px 30px #00000029;
	.hide-show {
		@media (min-width: 800px) {
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
	@media (max-width: 400px) {
		padding: 10px 10px;
		display: flex;
		justify-content: space-between;
		/* max-width: 380px%; */
	}
	@media (max-width: 500px) {
		padding: 10px 10px;
		display: flex;
		justify-content: space-between;
		/* max-width: 380px%; */
	}
	@media (max-width: 800px) {
		padding: 10px 10px;
		display: flex;
		justify-content: space-between;
		/* max-width: 380px%; */
	}
	display: flex;
	padding: 0 20px 0 67px;
	align-items: center;
	justify-content: space-between;
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
			overflow: hidden;
		}
		@media (max-width: 800px) {
			display: block;
			padding-right: 3px;
			color: white;
			font-size: 28px;
			overflow: hidden;
		}
	}
	img {
		width: 150px;
		height: 30px;
		@media (max-width: 400px) {
			/* float: left; */
			width: 100px;
			height: 25px;
		}
		@media (max-width: 500px) {
			/* float: left; */
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
		@media only screen and (max-width: 800px) {
			display: none;
		}

		ul {
			display: flex;
			padding-left: 350px;
			/* padding-top: 15px; */
			list-style-type: none;
			button {
				margin-top: -5px;
				font-family: "poppins";
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

const Main = styled.main`
	overflow: hidden;
	@media (max-width: 400px) {
		padding-top: 20px;
	}
	@media (max-width: 500px) {
		padding-top: 20px;
	}
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
	padding-top: 100px;
	padding-bottom: 30px;
	@media (max-width: 800px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		p {
			text-align: center;
		}
		.register {
			display: flex;
			justify-content: center;
		}
	}
	@media (max-width: 400px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 500px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		&:nth-child(1) {
			font-size: 3em;
			margin: 0 !important;
		}
	}

	.register {
		width: 100%;
		display: flex;
		.reg {
			color: #0092e0;
			text-decoration: none;
			cursor: pointer;
			font-family: "poppins";
			&:hover {
				color: white;
			}
		}
		.works {
			color: #0092e0;
			text-decoration: none;
			cursor: pointer;
			font-family: "poppins";
			&:hover {
				color: #0092e0;
			}
			@media (max-width: 500px) {
				display: none;
			}
		}

		@media (max-width: 500px) {
			display: flex;
			justify-content: center;
		}

		button {
			font-size: 18px;
			outline: none;
			font-family: "poppins";
			&:nth-child(1) {
				@media (max-width: 500px) {
					margin-right: 0;
				}
				background: white;
				color: #0092e0;
				outline: none;
				border: 1px solid white;
				padding: 10px 40px 10px 40px;
				margin-right: 25px;
				border-radius: 5px;
				cursor: pointer;
				&:hover {
					background: none;
					color: white;
					cursor: pointer;
				}
			}
			&:nth-child(2) {
				@media (max-width: 500px) {
					display: none;
				}
				border: 1px solid white;
				color: white;
				background: none;
				font-family: "poppins";
				padding: 10px 40px 10px 40px;
				border-radius: 5px;
				&:hover {
					background: white;
					color: #0092e0;
					cursor: pointer;
				}
			}
		}
	}

	img {
		width: 64%;
		height: calc(100vh - 148px);
		margin-right: -7vw;
		@media (max-width: 780px) {
			width: 80%;
			height: 80%;
			margin-right: 15px;
			/*   margin-left: auto; */
			margin-top: 40px;
		}
		@media (max-width: 400px) {
			width: 350px;
			height: 200px;
			margin-right: 0;
			margin-top: 40px;
		}
		@media (max-width: 500px) {
			width: 300px;
			height: 200px;
			margin-right: auto;
			margin-left: auto;
			margin-top: 40px;
		}
		@media (min-width: 768px) and (max-width: 1300px) {
			/* height: 385px; */
		}
	}
	.intro-text {
		@media (max-width: 400px) {
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-left: 0px;
		}
		@media (max-width: 500px) {
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-left: 0px;
		}
		@media (max-width: 800px) {
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-left: 0px;
		}
		color: white;
		width: 38%;
		padding-left: 65px;
		h2 {
			display: none;
			@media screen and (max-width: 800px) and (min-width: 700px) {
				display: block;
				color: #66c8ed;
				font-weight: lighter;
				font-size: 46px;
				text-align: center;
				width: 70%;
			}
			.here {
				color: white;
				cursor: pointer;
				display: inline;
				font-size: 34px;
				font-weight: lighter;
			}
			@media (max-width: 400px) {
				display: block;
				color: #66c8ed;
				font-weight: lighter;
				font-size: 34px;
				text-align: center;
			}
			@media (max-width: 500px) {
				display: block;
				color: #66c8ed;
				font-weight: lighter;
				font-size: 34px;
				text-align: center;
			}
		}
		h1 {
			font-family: "orkneyLight";
			@media (max-width: 400px) {
				display: none;
			}
			@media (max-width: 500px) {
				display: none;
			}
			@media (max-width: 800px) {
				display: none;
			}
			color: #66c8ed;
			font-weight: lighter;
			font-size: 44px;
			.here {
				color: white;
				cursor: pointer;
				display: inline;
				font-weight: lighter;
			}
		}
		p {
			width: 100%;
			text-align: left;
			font-family: "poppins";
			font-size: 20px;
			font-weight: normal;
			letter-spacing: 0px;
			color: #ffffff;
			opacity: 1;
			font-weight: lighter;
			opacity: 0.8;
			margin-top: 40px;
			margin-bottom: 40px;
			@media screen and (max-width: 800px) and (min-width: 600px) {
				text-align: center;
				font-size: 24px;
				line-height: 1.6;
				margin-top: 15px;
				margin-bottom: 20px;
			}
			@media (max-width: 500px) {
				text-align: center;
				font-size: 18px;
				line-height: 1.6;
				margin-top: 15px;
				margin-bottom: 20px;
			}
		}
	}
`;
