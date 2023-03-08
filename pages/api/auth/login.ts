import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie";
import axios from "axios"

interface User{
    first_name: string,
    last_name: string,
    email: string
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
        const response: any = await axios.post("https://apptelegram.repl.co/login", {
            email: user.current,
            password: password.current,
        })
        console.log(response)
        if (!response.data.token) return res.json({ message: "Credenciales Invalidas", status: 400 })
        else {
            const serialized = serialize("tokenP", response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30, // token valido para 30 dias
                path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            return res.json({message: "Credenciales Validas",user: {first_name: response.data.first_name, last_name: response.data.last_name, email: response.data.email}, status: 200});
        }
    } catch (e) {
        return res.json({ message: "Ocurrio un error " + e, status: 404 });
    }
}
