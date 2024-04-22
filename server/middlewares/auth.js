const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is Missing"
            });
        }


        try {
            //Token ko decode karke user ki body me bhar dege
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong While Validating the Token"
        });
    }
}


