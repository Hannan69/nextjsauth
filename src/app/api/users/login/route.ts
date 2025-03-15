import {connect} from "@/dbConfig/dbConfig";
import  User from "@/models/userModel" 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json ();
        const {email,password} = reqBody;
        console.log(reqBody)
        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User doesnt Exists"})
        }
        //they user from user.findOne database also brings along the password which is then compared below
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Password is Incorrect"})

        }
        //creating token data token for the sessions and JWT
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //create token takes tokenData and SECRET key
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn:"1h"})
        const response = NextResponse.json({message : "Login Successful"})
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        // return response sends the cookies and also sends the response
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}