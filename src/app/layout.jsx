import Haeder from "@/component/header/Haeder";
import Providers from "@/component/providers/Providers";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Loading from "./loading";
import styles from "./page.module.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={poppins.className}>
          <Suspense fallback={<Loading />}>
            <div className={styles.container}>
              <Haeder />
              {children}
            </div>
          </Suspense>
        </body>
      </Providers>
    </html>
  );
}