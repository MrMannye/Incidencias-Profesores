import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie";
import axios from "axios"

type Data = {
    message: string
    status: number
}

export default async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { user, password } = req.body;
    try {
        const response: any = await axios.post("", {
            user: user,
            password: password,
        })
        if (response.status !== 200) return res.json({ message: "Credenciales Invalidas", status: 400 })
        else {
            const serialized = serialize("myTokenName", response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30, // token valido para 30 dias
                path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            return res.json({message: "Credenciales Validas", status: 200});
        }
    } catch (e) {
        res.json({ message: "Ocurrio un error", status: 404 });
    }
}
