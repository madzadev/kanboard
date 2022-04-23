import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { api } from "../appwrite";

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
      setUser([
        ...user,
        $id,
        name,
        registration,
        status,
        passwordUpdate,
        // email,
        emailVerification,
        // prefs,
      ]);
      router.push("/boards");
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
      <h3>Do not have an account?</h3>
      <Link href="/signup">
        <h2>Register</h2>
      </Link>
    </div>
  );
};

export default Login;
