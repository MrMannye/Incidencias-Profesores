import axios from "axios";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req : NextRequest, res: NextResponse){
    const jwt = req.cookies.get("tokenP");
    console.log(jwt);
    if(!jwt) return NextResponse.redirect(new URL("/login", req.url));
    try {
        const response = await axios.post(process.env.NEXT_URL_BACKEND!,{token: jwt});
        if(response.status === 200){
            return NextResponse.next();
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/',"/profile","/addTask"],
  }