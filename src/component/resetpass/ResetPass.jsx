"use client";
import { resetPass } from "@/lib/actions/forgotPass";
import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./resetPass.module.css";

const formSchema = Yup.object({
  password: Yup.string()
    .required()
    .min(8, "Password Must Be At Least 8 Characters")
    .max(36, "Password Must Be Less Than 36 Characters"),
  confirmPass: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match! "),
});
const ResetPass = ({ params, token }) => {
  const [vissiblePass, setVissiblePass] = useState(false);
  const [checkToken, setToken] = useState(null);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPass: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const reset = await resetPass(values, params.jwt);
        toast.success("Password Reseted Successfully");
      } catch (error) {
        console.log(error);
        toast.error("Denied Access");
      }
    },
  });
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>reset your password</h4>
      {token ? (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.pass}>
              <input
                className={styles.inputPass}
                type={vissiblePass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete={"on"}
              />
              <div
                className={styles.icon}
                onClick={() => setVissiblePass((prev) => !prev)}
              >
                {vissiblePass ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <span className={styles.err}>{formik.errors?.password}</span>
            ) : (
              ""
            )}
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="confirmpassword">
              confirm Password
            </label>
            <input
              className={styles.input}
              type="password"
              name="confirmPass"
              id="confirmpassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete={"on"}
            />
            {formik.errors.confirmPass && formik.touched.confirmPass ? (
              <span className={styles.err}>{formik.errors?.confirmPass}</span>
            ) : (
              ""
            )}
          </div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={styles.btn}
          >
            {formik.isSubmitting ? "please waiting ....." : "reset"}
          </button>
        </form>
      ) : (
        <div className={styles.errtoken}>this user is not exist</div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ResetPass;
