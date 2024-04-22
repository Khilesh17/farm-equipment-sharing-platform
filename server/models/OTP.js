const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const verifyEmailTemplet = require("../mail/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Vedrification Email",
            verifyEmailTemplet(otp)
        );

        // console.log("Email sent SuccessFuly : ", mailResponse.response);
    }
    catch (error) {
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}


//After Creating the document we have to create post save hook to send verification email
OTPSchema.pre("save", async function (next) {
    
    // console.log("New Documnet saved to DB");

    // This.isNew is used to check the doc is new or not
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);