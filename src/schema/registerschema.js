import * as Yup from "yup";

const matchsPasword = (str) => {
  return `your password must have at least 1 ${str} character`;
};

export const registerSchema = Yup.object({
  firstName: Yup.string().required("this field is Requird."),
  lastName: Yup.string().required("this field is Requird."),
  email: Yup.string()
    .email("enter a valid email adress.")
    .required("email is requird."),
  password: Yup.string()
    .min(8, "password should be 8 characters at least.")
    .required("password is requird.")
    .matches(/[0-9]/, matchsPasword("digit"))
    .matches(/[a-z]/, matchsPasword("lowercase"))
    .matches(/[A-Z]/, matchsPasword("uppercase")),
  confirmPassword: Yup.string()
    .required("please retype your password")
    .oneOf([Yup.ref("password")], "your passwords do not match."),
});
