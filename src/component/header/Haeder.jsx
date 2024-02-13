"use client";
import logo from "@/../public/lock.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Haeder = () => {
  const router = useRouter();
  return (
    <div className={styles.haeder}>
      <div onClick={() => router.push("/")} className={styles.logo}>
        <Image src={logo} alt="logo " width={70} height={70} />
        <h1 className={styles.title}>Auth</h1>
      </div>
    </div>
  );
};
export default Haeder;
