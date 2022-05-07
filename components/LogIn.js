import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { api } from "../appwrite";

import styles from "./LogIn.module.css";

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const login = await api.login(email, password);
      const { $id } = login;
      setUser($id);
      router.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to KanBoard!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        className={styles.form}
      >
        <input
          {...register("email", { required: true })}
          className={styles.input}
          placeholder="Your email"
        />
        {errors.email && <span>Enter a valid email</span>}
        <input
          {...register("password", { required: true })}
          className={styles.input}
          type="password"
          placeholder="Your password"
        />
        {errors.password && <span>Enter a valid password</span>}

        <input type="submit" className={styles.submit} value="Log In" />
      </form>
    </div>
  );
};

export default Login;
