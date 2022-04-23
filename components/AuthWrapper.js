import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

import Header from "../components/Header";
import ContentWrapper from "../components/ContentWrapper";
import Footer from "../components/Footer";

import styles from "./AuthWrapper.module.css";

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </div>
  );
};

export default AuthWrapper;
