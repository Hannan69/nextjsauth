import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
export default function UserProfile({params}:any){
    return (
        <BackgroundBeamsWithCollision>
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-2xl">Profile Page
              <span className="p-0.5 rounded bg-red-500  text-black ml-2">{params.id}</span>
            </p>
          </div>

        </BackgroundBeamsWithCollision>
    )
}   