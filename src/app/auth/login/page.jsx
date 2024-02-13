import LoginForm from "@/component/login/LoginForm";
import styles from "./Login.module.css";
const page = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default page;
