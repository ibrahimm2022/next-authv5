import styles from "./Message.module.css";
const Message = ({ children }) => {
  return <div className={styles.message}>{children}</div>;
};

export default Message;
