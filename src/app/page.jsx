import SigtnBtn from "@/component/signbtn/SigtnBtn";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.des}> A simple authentication service</p>
      <SigtnBtn />
    </main>
  );
}
