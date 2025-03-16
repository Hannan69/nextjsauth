import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true
        })
        //expires the logout session 
        response.cookies.set("token", "", {httpOnly:true , expires:new Date(0)});

        return response
    } catch (error :any) {
        NextResponse.json({error: error.message},{status:500})
    }
}