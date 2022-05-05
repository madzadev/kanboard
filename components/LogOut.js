import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { api } from "../appwrite";
import { useEffect } from "react";

import styles from "./LogOut.module.css";

const LogOut = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  //   useEffect(()=>{
  //     const getUserInfo = async () => {
  //         try {
  //           const fetchPostById = await api.fetchPostById(result.draggableId);
  //           fetchPostById.column_id = destination.droppableId;
  //           await api.updatePost(result.draggableId, fetchPostById);
  //         } catch (err) {
  //           console.log(err.message);
  //         }
  //       };
  //       getUserInfo();
  //   },[])

  const onClick = async () => {
    try {
      const login = await api.logout();
      setUser("");
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      {/* <p>Hi, Madza!</p> */}
      <button className={styles.button} onClick={onClick}>
        Log out
      </button>
    </div>
  );
};

export default LogOut;
