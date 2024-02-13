"use client";
import Social from "@/component/social/Social";
import { loginSchema } from "@/schema/loginschema";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import styles from "./LoginForm.module.css";
const LoginForm = () => {
  const [vissiblePass, setVissiblePass] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      // login(values);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (!result.ok) {
        toast.error(result?.error);
        return;
      }

      router.push("/");
    },
  });
  const changeHandle = (e) => {
    formik.handleChange(e);
  };
  return (
    <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
      <label className={styles.label}>welcome back</label>
      <div className={styles.group}>
        <input
          onChange={changeHandle}
          onBlur={formik.handleBlur}
          name="email"
          className={`${styles.input} ${
            formik.errors?.email && formik.touched.email ? styles.filederr : ""
          }`}
          type="text"
          placeholder="email"
          value={formik.values.email}
        />
        <label className={styles.err}>
          {formik.touched.email && formik.errors.email}
        </label>
      </div>
      <div className={styles.group}>
        <div style={{ position: "relative" }}>
          <input
            onChange={changeHandle}
            onBlur={formik.handleBlur}
            name="password"
            className={`${styles.input} ${
              formik.errors?.password && formik.touched.password
                ? styles.filederr
                : ""
            }`}
            type={`${vissiblePass ? "text" : "password"}`}
            placeholder="Password"
            autoComplete="on"
          />
          <div
            className={`${styles.icon} ${
              formik.errors?.password && formik.touched.password && styles.err
            }`}
            onClick={() => setVissiblePass((prev) => !prev)}
          >
            {vissiblePass ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <label className={styles.err}>
          {formik.touched.password && formik.errors.password}
        </label>
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className={styles.btn}
      >
        {formik.isSubmitting ? <span> login in...</span> : "login"}
      </button>
      <Social />
      <div className={styles.links}>
        <Link className={styles.link} href={"/auth/register"}>
          Don&apos;t have an account?
        </Link>
        or
        <Link className={styles.link} href={"/auth/forgotpassword"}>
          Forget password?
        </Link>
      </div>
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
