"use client";
import { forgotPass } from "@/lib/actions/forgotPass";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./forgotPass.module.css";
import image from "/public/Forgot-Pass.png";
const formSchema = Yup.object({
  email: Yup.string().email("please input a valid email!").required(),
});
const ForgotPass = () => {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window?.location?.origin);
  }, [origin]);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await forgotPass(values, origin);
        toast.success("Reset Password Link Was Sent To Your Email.");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div className={styles.forgotPass}>
      <form className={styles.form} noValidate onSubmit={formik.handleSubmit}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="email">
            <FaEnvelope />
          </label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email Adress"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            noValidate
          />
        </div>
        <span className={styles.err}>{formik.errors?.email}</span>
        <button
          className={styles.btn}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "please wating..." : "send"}
        </button>
      </form>
      <div className={styles.img}>
        <Image src={image} width={200} height={200} alt={"forgot"} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPass;
