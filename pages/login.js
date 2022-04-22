import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/user.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true, maxLength: 20 })} />
        {errors.email && <span>Enter a valid email</span>}
        <input {...register("password", { pattern: /^[A-Za-z]+$/i })} />
        {errors.password && <span>Enter a valid password</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
