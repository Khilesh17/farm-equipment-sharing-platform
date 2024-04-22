const { contactUsEmail } = require("../mail/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
    const {
        email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode
    } = req.body
    
    try {
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(
                email,
                firstname,
                lastname,
                message,
                phoneNo,
                countrycode
            )
        )

        return res.status(200).json({
            success: true,
            message: "Email send successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while contacting us",
            error: error.message
        })
    }
}