"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useEffect, useState } from "react";

export default function ProfilePage(){
  const router = useRouter()
  const [data, setData] = useState("No Data")
  const onLogOut = async () => {
    try {
     const response = await axios.get('/api/users/logout')
     toast.success("logged out")
     router.push('/login')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    console.log(response.data)
    //extracting response.data.data._id of the user
    setData(response.data.data._id)

  }
  useEffect(()=>{
    getUserDetails()

  })
  return (
    <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr/>
            <h2 className="text-white p-2 rounded bg-green-950 ">{data === 'No Data' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
                onClick={onLogOut}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Logout
            </button>
  
        </div>
    </BackgroundBeamsWithCollision>
);
}  