import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type User = {
    user?: string,
    status: number;
}

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse<User>) {
    const {tokenP} = req.cookies;
    if (!tokenP) return res.json({user: "", status: 401});
    try {
        const user = await axios.post(process.env.NEXT_URL_BACKEND!,{token: tokenP});
        res.json({user: user.data, status: 200});
    } catch (error) {
        res.json({user: "", status:400});
    }
}