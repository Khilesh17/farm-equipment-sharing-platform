const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Equipment = require("../models/Equipment");
const Booking = require("../models/Booking");
const mailSender = require("../utils/mailSender");
const { rentedEquipmentMail } = require("../mail/rentedEquipmentMail");


exports.capturePayment = async (req, res) => {
    try {
        const { equipments } = req.body;
        const userId = req.user.id;

        if (equipments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No equipment is there To purchase"
            })
        }

        //Calulating the total amount
        let totalAmount = 0;
        for (const equipmentId of equipments) {
            let equipment = await Equipment.findById(equipmentId);

            if (!equipment) {
                return res.status(404).json({
                    success: false,
                    message: "Equipment not Found"
                })
            }

            //Now chcecking if the equipment is in booking or not
            if (equipment.activeBooking === true) {
                return res.status(400).json({
                    success: false,
                    message: "Eqwuipment is already in booking"
                })
            }

            totalAmount += equipment.totalPrice
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }


        //Now Initializing the payment
        const paymentResponse = await instance.orders.create(options);
        console.log("Initialization of Payment : ", paymentResponse);

        res.status(200).json({
            success: true,
            data: paymentResponse,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured while Capturing the Payment",
            error: err.message
        })
    }
}


exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        })
    }

    //signature verifiction
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await rentEquipments(equipments, userId, res);
        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        });
    }

    return res.status(400).json({
        success: false,
        message: "Payment Failed"
    })
}

const rentEquipments = async (equipments, userId, res) => {
    if (!equipments || !userId) {
        return res.status(404).json({
            success: false,
            message: "Please provide Equipment and User Id"
        })
    }


    for (const equipmentId of equipments) {
        try {

        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Error Occured while retning saving the rented equipment"
            })
        }
    }
}



// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details"
        })
    }

    try {
        const customerDetail = await User.findById(userId)

        await mailSender(
            customerDetail.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${customerDetail.firstName} ${customerDetail.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Could not send email"
        })
    }
}