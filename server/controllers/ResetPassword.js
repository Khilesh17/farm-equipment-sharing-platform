const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//email enter karne ke baad mail send karne ka kaam yaha se hoga
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        //Validating the user
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "This email is not Registered"
            });
        }

        //generating the resetPass-token
        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3 * 60 * 1000
            },
            { new: true }
        );

        //Now sending the eamil
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        return res.json({
            success: true,
            message: "Email Sent SuccessFully for Resetting the password" 
        })        
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Some error in Sending Reset Password Mail"
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirmPassword Does not match"
            });
        }

        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            });
        }

        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token by sending the new Mail for resetting password`,
			});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }  
        );

        return res.status(200).json({
            success: true,
            message: 'Password Reset Successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to reset Password"
        })
    }
}
