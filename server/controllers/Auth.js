const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const passwordUpdated = require("../mail/passwordUpdate");
const mailSender = require("../utils/mailSender");
require("dotenv").config();


exports.sendOTP = async (req, res) => {
    
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already Exist"
            });
        }

        //Generating otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        //Making sure the otp is unique
        var result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpDoc = {
            email,
            otp,
        };

        const creatingResponse = await OTP.create(otpDoc);

        res.status(200).json({
            success: true,
            message: "Otp Sent SuccessFully",
            OTP: otp
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;

        // Validaitons 
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All Fields are Required"
            });
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                  "Password and Confirm Password do not match. Please try again.",
            })
        }

        //Checking if user is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        //Finding the most recent OTP
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0) {
            return res.status(400).json({
                success: false, 
                message: "The Otp is not valid"
            })
        }
        else if (otp !== response[0].otp) {
            return res.status(400).json({
                success: true,
                message: "The OTP is invalid"
            })
        }

        //hashing the pass
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            contactNumber: null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        return res.status(200).json({
            success: true,
            message: "User Registerd SuccessFully",
            user
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User cannot be Registered. Please Try Again..."
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            });
        }

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is Not Registered"
            });
        }

        //Comparing the pass -> if same then generate JWT token and 
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
            };

            //JWT created
            const jwtToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            )

            user.token = jwtToken;
            user.password = undefined;

            //Generating cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            // cookie -> name, data, options
            res.cookie("token", jwtToken, options).status(200).json({
                success: true,
                message: "User Logged in Successfully",
                jwtToken,
                user
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login Failed"
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;


        //Checking the Old pass is correct or not
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "You Entered Old password Incorrect"
            })
        }
        
        //Hashing the new pass and update the pass in db and also sending the mail for pass updation
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );
        
        //sending mail
        try {
            const mailResponse = await mailSender(
                updatedUserDetails.email,
                "Password has been Updated Successfully",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )

            return res.status(200).json({
                success: true,
                message: "Password Updated Successfully",
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error occured While sending Mail",
                error: err.message
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to change Password",
            error: err.message
        })
    }
}