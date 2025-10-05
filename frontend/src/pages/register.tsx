import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { useNavigate } from "react-router";
import { loginSchema } from "../utils/zod";
import z from "zod";
import { toast } from "react-toastify/unstyled";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {backendUrl}=useContext(AppContext);
 const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
  loginSchema.parse({ email, password, name });
} catch (err: any) {
  if (err instanceof z.ZodError) {
    err.issues.forEach(issue => toast.error(issue.message));
  }
  return; // stop further execution
}
    
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        email,
        password,
        name,
      });
      console.log(data)
      if(data.success ){
        toast.success("Registration successful")
        navigate('/login')
      }else {
        toast.error(data.message)
        return;
      }

    } catch (err:any) {
       toast.error(err.message);
    }
 
    
  };
  return (
    <form 
      onSubmit={onSubmit}
    className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          Create an account
        </p>
        <p className="">
          Please Sign up to book
          appointment
        </p>
        <div className="w-full">
          <p className="">Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
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
            Sign Up </button>
          
        
          <p className="">
            Already have an account?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              {" "}
              Login here
            </span>
          </p>
        
      </div>
    </form>

  );
};

export default Register;
