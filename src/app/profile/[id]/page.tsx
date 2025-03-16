"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/users/me`);
        setUser(response.data.data);
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserDetails();
  }, [params.id]);

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        {user ? (
          <p className="text-2xl">
            <span className="p-0.5 rounded bg-red-500 text-black ml-2">{params.id}</span>
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Username: {user?.username}</p>
          <p className="text-lg font-semibold">Email: {user?.email}</p>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
