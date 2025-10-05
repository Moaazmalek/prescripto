import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/zod";
import z from "zod";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import type{ AppDispatch } from "../redux/store";
import { loginUser } from "../redux/slices/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl } = useContext(AppContext);
  const dispatch=useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse({ email, password });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => toast.error(issue.message));
      }
      return; // stop further execution
    }

    
        dispatch(loginUser({email,password}))
        toast.success("Login Successfully")
        navigate("/")

     
  };
  return (
    <form onSubmit={onSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p className="">Please log in to book appointment</p>

        <div className="w-full ">
          <p className="">Email</p>
          <input
            type="text"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="">Password</p>
          <input
            type="password"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>

        <p className="">
          Create a new account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary underline cursor-pointer"
          >
            click here
          </span>{" "}
        </p>
      </div>
    </form>
  );
};

export default Login;
