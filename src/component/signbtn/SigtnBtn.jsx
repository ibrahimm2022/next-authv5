"use client";
import { findUser } from "@/lib/utils/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./signBtn.module.css";

const SigtnBtn = () => {
  const { data: session } = useSession();
  const popup = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await findUser(session?.user.email);

        if (!data) {
          setUser(null);
          return;
        }
        const { password, emailVerified, ...dataUser } = data;

        if (!dataUser) {
          setUser(null);
          return;
        }
        setUser({ ...dataUser });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const showPopup = () => {
    setPopup((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      {session ? (
        <>
          {user ? (
            <p className={styles.username}>
              {user?.firstName + " " + user?.lastName}
            </p>
          ) : (
            <p className={styles.loading}>loading user...</p>
          )}

          <Popup
            contentStyle={{
              color: "var(--main)",
              padding: "10px",
              width: "fit-content",
              borderRadius: "10px",
              fontSize: "22px",
            }}
            trigger={<button className={styles.btn}>signout</button>}
            arrow={false}
            modal
            ref={popup}
          >
            <div>
              <p>Are you sure you want to sign out?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => signOut("credentials", { redirct: false })}
                  className={styles.btnpopup}
                  href={"/api/auth/signout"}
                >
                  yes
                </button>
                <button
                  onClick={() => popup.current.close()}
                  className={styles.btnpopup}
                >
                  cancel
                </button>
              </div>
            </div>
          </Popup>
        </>
      ) : (
        <>
          <Link className={styles.btn} href={"api/auth/signin"}>
            signin
          </Link>
          <Link className={styles.btn} href={"/auth/register"}>
            signup
          </Link>
        </>
      )}
    </div>
  );
};

export default SigtnBtn;
