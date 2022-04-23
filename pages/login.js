import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { api } from "../appwrite";
import { userState } from "../store/user";

const Login = () => {
  const [aa, setAa] = useState(0);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    setAa("111111");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const login = await api.login(email, password);
      const {
        $id,
        name,
        registration,
        status,
        passwordUpdate,
        // email,
        emailVerification,
        prefs,
      } = login;
      setUser(name);

      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} />
        {errors.email && <span>Enter a valid email</span>}
        <input {...register("password", { required: true })} />
        {errors.password && <span>Enter a valid password</span>}

        <input type="submit" />
      </form>
      <Link href="/">
        <h2>Back home</h2>
      </Link>
    </div>
  );
};

export default Login;
