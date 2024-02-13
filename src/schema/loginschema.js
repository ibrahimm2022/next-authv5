import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email Not Valid").required("Email Is Required"),
  password: Yup.string().required("password Is Required"),
});
