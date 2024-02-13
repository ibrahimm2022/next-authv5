"use client";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import styles from "./CheckPass.module.css";
const CheckPasswordStr = ({ pass, formik }) => {
  const [checkPass, setCheckPass] = useState(0);

  useEffect(() => {
    setCheckPass(passwordStrength(pass).id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass]);
  const tooWeak = styles.tooweak;
  const weak = styles.weak;
  const strong = styles.strong;
  const tooStrong = styles.toostrong;
  return (
    <div className={styles.checkpassword}>
      {Array.from({ length: checkPass + 1 }).map((i, indx) => {
        return (
          <>
            {pass ? (
              <div
                key={i}
                style={{
                  width: "20%",
                  height: "3px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                className={
                  checkPass === 0
                    ? tooWeak
                    : checkPass === 1
                    ? weak
                    : checkPass === 2
                    ? strong
                    : tooStrong
                }
              ></div>
            ) : (
              <span key={indx} className={styles.err}>
                {formik?.touched.password && formik?.errors.password}
              </span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default CheckPasswordStr;
