import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
	firstName: Yup.string().min(2).required("First Name is required"),
	lastName: Yup.string().min(2).required("Last Name is required"),
	email: Yup.string().email().required("Enter valid email"),
	password: Yup.string().min(8).required("Password is required"),
	country: Yup.string().required("Country is required"),
	phone: Yup.string().min(7).max(20).required("Phone number is required"),
	accountType: Yup.string().required("Account type is required"),
	accept: Yup.bool().oneOf([true], "Please agree to our terms"),

	companyWebsite: Yup.string().when("accountType", {
		is: "organization",
		then: (schema) =>
			schema
				.matches(
					/^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
					"Enter correct url!"
				)
				.required("Please enter company's website"),
	}),
	organizationName: Yup.string().when("accountType", {
		is: "organization",
		then: (schema) => schema.required("Organization name is required"),
	}),
});

export const loginValidation = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
});
