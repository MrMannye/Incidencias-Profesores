import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie";
import axios from "axios"

interface User{
    Id: number,
    first_name: string,
    last_name: string,
    second_name: string,
    age: number,
    email: string
    password: string
}

type Data = {
    user?: User
    message: string
    status: number
}

export default async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { user, password } = req.body;
    try {
        const response: any = await axios.post("https://proactiveweek-superbrandon2018.b4a.run/auth/login", {
            email: user.current,
            password: password.current,
        })
        console.log(response)
        if (!response.data.body) return res.json({ message: "Credenciales Invalidas", status: 400 })
        else {
           const serialized = serialize("tokenP", response.data.body.email, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 1000 * 60 * 60 * 24 * 30, // token valido para 30 dias
               path: "/",
           });
           res.setHeader("Set-Cookie", serialized);
           return res.json({message: "Credenciales Validas",user: {Id: response.data.body.Id,first_name: response.data.body.name, last_name: response.data.body.last_name,second_name: response.data.body.second_name,age: response.data.body.age, email: response.data.body.email,password: response.data.body.password}, status: 200});
        }
    } catch (e) {
        return res.json({ message: "Credenciales Invalidas", status: 401 });
    }
}
