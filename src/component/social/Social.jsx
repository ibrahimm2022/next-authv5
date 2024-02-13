import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./Social.module.css";
const Social = ({ showSocial }) => {
  return (
    <>
      {showSocial ? (
        <div className={styles.social}>
          <button className={styles.btn}>
            <FcGoogle />
          </button>
          <button className={styles.btn}>
            <FaGithub />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Social;
