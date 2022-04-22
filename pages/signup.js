import Link from "next/link";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/user.js";
import { api } from "../appwrite";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await api.register(name, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1>Please Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Enter name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Enter a valid name</span>}

        <label htmlFor="email">Enter email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span>Enter a valid email</span>}

        <label htmlFor="password">Enter password</label>
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

export default SignUp;
