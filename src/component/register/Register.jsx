"use client";
import { register } from "@/lib/actions/registerForm";
import { registerSchema } from "@/schema/registerschema";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import CheckPasswordStr from "../chekstrength/CheckPasswordStr";
import styles from "./Register.module.css";
const Register = () => {
  const [isVissible, setIsVissible] = useState(false);
  const [origin, setOrigin] = useState("");
  const popup = useRef();
  const handleVissible = () => setIsVissible((prev) => !prev);

  useEffect(() => {
    setOrigin(window?.location?.origin);
  }, [origin]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const { confirmPassword, ...user } = values;
      try {
        const res = await register(user, origin);
        toast.success("The User Registered successfullt");
        resetForm();
      } catch (error) {
        console.log(error);
        setFieldError("email", "This Email Is Exist");
      }
    },
  });
  const handleChange = (e) => {
    formik.handleChange(e);
  };
  return (
    <div className={styles.register}>
      <h3 className={styles.title}>register</h3>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.group} style={{ flex: "1" }}>
          <label htmlFor="firstName" className={styles.label}>
            first name
          </label>
          <input
            onChange={handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="firstName"
            className={`${styles.input} ${
              formik.touched.firstName && formik.errors.firstName
                ? styles.fielderr
                : ""
            }`}
            autoComplete="on"
          />
          <span className={styles.err}>
            {formik.touched.firstName && formik.errors.firstName}
          </span>
        </div>
        <div className={styles.group} style={{ flex: "1" }}>
          <label htmlFor="lastName" className={styles.label}>
            last name
          </label>
          <input
            onChange={handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className={`${styles.input} ${
              formik.touched.lastName && formik.errors.lastName
                ? styles.fielderr
                : ""
            }`}
            name="lastName"
            autoComplete="on"
          />
          <span className={styles.err}>
            {formik.touched.lastName && formik.errors.lastName}
          </span>
        </div>
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            email adress
          </label>
          <input
            onChange={handleChange}
            onBlur={formik.handleBlur}
            type="email"
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email ? styles.fielderr : ""
            }`}
            name="email"
            autoComplete="on"
          />
          <span className={styles.err}>
            {formik.touched.email && formik.errors.email}
          </span>
        </div>
        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>
            password
          </label>
          <div style={{ position: "relative" }}>
            <input
              onChange={handleChange}
              onBlur={formik.handleBlur}
              type={isVissible ? "text" : "password"}
              className={`${styles.input} ${
                formik.touched.password && formik.errors.password
                  ? styles.fielderr
                  : ""
              }`}
              name="password"
              autoComplete="on"
            />
            <div
              className={styles.icon}
              style={
                formik.errors.password && formik.touched.password
                  ? { fontSize: "12px", color: "red" }
                  : {}
              }
              onClick={() => handleVissible()}
            >
              {isVissible ? (
                <FaRegEyeSlash className={styles.show} />
              ) : (
                <FaRegEye className={styles.show} />
              )}
            </div>
          </div>
          <CheckPasswordStr formik={formik} />
        </div>
        <div className={styles.group}>
          <label htmlFor="confirmPassword" className={styles.label}>
            confirm Password
          </label>
          <input
            onChange={handleChange}
            onBlur={formik.handleBlur}
            type={isVissible ? "text" : "password"}
            className={`${styles.input} ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.fielderr
                : ""
            }`}
            name="confirmPassword"
            autoComplete="on"
          />
          {/* <div className={styles.icon} onClick={handleVissible}>
            {isVissible ? (
              <FaRegEyeSlash className={styles.show} />
            ) : (
              <FaRegEye className={styles.show} />
            )}
          </div> */}
          <span className={styles.err}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </span>
        </div>

        <Popup
          contentStyle={{
            color: "var(--main)",
            padding: "10px",
            width: "fit-content",
            background: "transparent",
            border: "none",
            borderRadius: "10px",
            fontSize: "22px",
          }}
          trigger={
            <span
              s
              className={`${styles.btn}  ${
                formik.isSubmitting ? styles.btnsubmitting : ""
              }`}
            >
              {formik.isSubmitting ? "signup in....." : "Sign Up"}
            </span>
          }
          arrow={false}
          modal
          ref={popup}
        >
          <div className={styles.popupContainer}>
            <h3 className={styles.popupTitle}>may, i have your attention</h3>
            <h5 className={styles.popupDes}>
              Please be aware that the entered data has been recorded in the
              database and can be accessed by the developer of this website.
            </h5>
            <div className={styles.popupBtnwrap}>
              <button
                type="submit"
                onClick={async () => {
                  try {
                    await formik.handleSubmit();
                    popup.current.close();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className={styles.btnpoup}
              >
                Continue
              </button>
              <button
                onClick={() => popup.current.close()}
                className={styles.btnpoup}
              >
                Cancel
              </button>
            </div>
          </div>
        </Popup>
        <Link href={"/auth/login"} className={styles.link}>
          already have an account
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
