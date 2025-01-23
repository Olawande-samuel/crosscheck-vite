import { Formik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import * as Yup from "yup";
import { sendMessage } from "../state/actions/verifications";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import chat from "../asset/comment.svg";
import { cn } from "@/lib/utils";

interface Props {
	id: string;
}
const FormModal = ({ id }: Props) => {
	const [loading, setLoading] = useState(false);
	const dateTime = new Date();

	return (
		<Dialog>
			<DialogTrigger>
				<img src={chat} alt="message" />
			</DialogTrigger>
			<DialogContent className="p-0 bg-transparent  w-full max-w-[360px] border-none ">
				<ModalWrapper className="mx-auto bg-white">
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						style={{ marginTop: "20px" }}
					/>
					<Formik
						initialValues={{ message: "", subject: "", dateTime }}
						onSubmit={async (values, { resetForm }) => {
							setLoading(true);
							try {
								const response = await sendMessage({ ...values, id });
								if (response.data.message === "message sent successfully") {
									setLoading(false);
									toast.success("message sent");
								}
								resetForm({
									values: { dateTime: new Date(), message: "", subject: "" },
								});
								// setTimeout(() => {
								// 	onClose();
								// }, 3000);
							} catch (err) {
								console.log(err);
								setLoading(false);
								toast.error("An error occurred try again");
							}
						}}
						validationSchema={Yup.object().shape({
							subject: Yup.string().required("Required !"),
							message: Yup.string().max(150).required("Required !"),
						})}
					>
						{(props) => {
							const {
								values,
								touched,
								errors,
								handleChange,
								handleBlur,
								handleSubmit,
							} = props;
							return (
								<form className="form" onSubmit={handleSubmit}>
									<p>Report an issue</p>

									<div className="field px-4 space-y-2 w-full">
										<label htmlFor="subject">subject</label>
										<input
											name="subject"
											type="text"
											value={values.subject}
											onChange={handleChange}
											onBlur={handleBlur}
											className="h-[30px] px-2 w-full text-sm rounded-[10px] text-[#707070] opacity-80 outline outline-transparent border-[0.5px] border-[#707070]"
											disabled={loading}
										/>
									</div>
									<div className="field px-4 space-y-2 w-full">
										<label htmlFor="message">message</label>
										<textarea
											name="message"
											value={values.message}
											onChange={handleChange}
											onBlur={handleBlur}
											className={cn(
												"rounded-[10px] px-2 text-sm w-full h-[70px] text-[#707070] opacity-80 outline outline-transparent border-[0.5px] border-[#707070]",
												errors.message &&
													touched.message &&
													"error flex text-red-600 w-full "
											)}
											disabled={loading}
										/>
									</div>
									{errors.message && touched.message && (
										<div className="input-feedback">{errors.message}</div>
									)}
									<button className="button" type="submit">
										{
											loading ? "Sending" : "Send message"
											// <FontAwesomeIcon
											//   icon={faLongArrowAltRight}
											//   style={{ marginLeft: "1.5rem", fontSize: "1.5rem" }}
											// />
										}
									</button>
								</form>
							);
						}}
					</Formik>
				</ModalWrapper>
			</DialogContent>
		</Dialog>
	);
};

// const OVERLAY_STYLES = {
// 	position: "fixed" as const,
// 	top: 0,
// 	left: 0,
// 	bottom: 0,
// 	right: 0,
// 	backgroundColor: "rgba(0,0,0,0.7)",
// 	zIndex: 1000,
// };

const ModalWrapper = styled.div`
	/* position: fixed;
	top: 55%;
	left: 50%;
	transform: translate(-50%, -50%); */
	/* background: white;
	z-index: 1000; */
	/* &:hover {
		border: var(--mainYellow);
		box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
	} */
	.form {
		width: 350px;
		min-height: 340px;

		p {
			margin-top: 0 !important;
			margin-bottom: 10px !important;
			padding: 0.3rem 0 0.5rem 0;
			font-family: "poppins";
			font-size: 20px;
			text-align: center !important;
			font-weight: normal;
			background: #0091df;
			letter-spacing: 0.6px;
			color: #ffffff;
			opacity: 1;
		}
		.field {
			display: block;

			input,
			label {
				display: block;
			}
			label {
				font-family: "poppins";
				letter-spacing: 0.32px;
				color: #707070;
				text-transform: capitalize;
				opacity: 1;
				padding-top: 0.5rem;
			}
			/* input {
				height: 30px;
				color: #707070;
				border-radius: 10px;
				opacity: 0.8;
				outline: none;
				border: 0.5px solid #707070;
			} */
			textarea {
				height: 70px;
				margin-bottom: 0.5rem;
				border-radius: 10px;
				outline: none;
				padding: 1rem;
				border: 1px solid "";
			}
		}
		.button {
			font-family: "poppins";
			font-weight: bold;
			width: 250px;
			text-transform: capitalize;
			margin: 0 auto;
			background: #0091df;
			letter-spacing: 0.32px;
			color: #ffffff;
			opacity: 1;
			border: none;
			padding: 0.6rem;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			outline: none;
			margin-top: 20px;
			font-size: 1.2rem;
		}
		.input-feedback {
			color: red;
			margin-left: 1rem;
			font-size: 14px;
		}
	}
`;

export default FormModal;
