import jwt from "jsonwebtoken";

export const generateToken = (userId , res ) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRY || "7d"
    })

    //only for testing purposes
    /*console.log("Setting cookie:", {
        name: 'token',
        value: token,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "Lax" : "Strict",
        secure: process.env.NODE_ENV !== "development",
        path: '/',
       
    }); */

    res.cookie("token",token, {
        //7 days in milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true, // prevents XSS attacks
        sameSite: process.env.NODE_ENV === "development" ? "Lax" : "Strict", // Adjust for development

        secure: process.env.NODE_ENV !== "development",
        path: "/", // Set the path for the cookie,
       
    })
}