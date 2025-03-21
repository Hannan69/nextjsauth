import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbConfig'
import { getTokenData } from "@/helpers/getTokenData";


connect()
export async function GET(request : NextRequest){
    try {
       const userId = await getTokenData(request)
       const user = await User.findOne({_id: userId}).select('-password')
       return NextResponse.json({
            message: 'User Found',
            data : user
       })
    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:400})
    }
}