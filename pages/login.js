import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/user.js";
import { api } from "../appwrite";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await api.login(email, password);
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
    </div>
  );
};

export default Login;
