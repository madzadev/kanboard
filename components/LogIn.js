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
      router.push("/boards");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("email", { required: true })}
          className={styles.input}
        />
        {errors.email && <span>Enter a valid email</span>}
        <input
          {...register("password", { required: true })}
          className={styles.input}
        />
        {errors.password && <span>Enter a valid password</span>}

        <input type="submit" className={styles.submit} />
      </form>
      <h3>Do not have an account?</h3>
      <Link href="/signup">
        <h2>Register</h2>
      </Link>
    </div>
  );
};

export default Login;
