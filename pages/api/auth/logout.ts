import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
    const {tokenP} = req.cookies;
    if (!tokenP) return res.json({message: "Not logged in", status: 401});
    try {
        const serialized = serialize("tokenP", null!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({message: "Logout correct"});
    } catch (error) {
        res.json("An error ocurred");
    }
}