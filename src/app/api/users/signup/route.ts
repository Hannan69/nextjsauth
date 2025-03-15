import {connect} from "@/dbConfig/dbConfig";
import  User from "@/models/userModel" 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()   

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already Exists"},{status:400})
        }
        //hash password
        const salt =  await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        //creating a new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        //save to database
        const savedUser = await newUser.save() 
        return NextResponse.json({message: "User Created Successfully"},{status:201})
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}