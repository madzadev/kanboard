import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/user.js";
import { api } from "../appwrite";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await api.login(email, password);
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
