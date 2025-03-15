"use client";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({email: "", password: "" });
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading,setLoading]=useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("api/users/login" , user)
      console.log("Logged In Successfully",response.data)
      toast.success("Login Success")
      router.push("/profile")

    } catch (error:any) {
      console.log("Login Failed",error.message)
      toast.error(error.message)

    } finally{
      setLoading(false)
    }
  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-6">
      <BackgroundBeams/>
      <div className="absolute inset-0 bg-background-beams opacity-50"></div>

      <div className="relative w-full max-w-md rounded-lg bg-white/10 p-8 shadow-lg backdrop-blur-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">{loading ? "Processing" : "Login"}</h1>
        <hr className="mb-6 border-gray-600" />

        <div className="space-y-4">

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-700 bg-black/30 p-3 text-white shadow-sm focus:border-white focus:ring focus:ring-white/50"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-black/30 p-3 text-white shadow-sm focus:border-white focus:ring focus:ring-white/50"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={onLogin}
            className="mt-4 w-full rounded-md bg-white px-4 py-2 font-semibold text-black transition-all hover:bg-gray-300"
          >
            {buttonDisabled?"Enter Details":"Login"}
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-400">
            Dont have an account?{" "}
            <Link href="/signup" className="text-white underline hover:text-gray-300">
              Signup
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}
