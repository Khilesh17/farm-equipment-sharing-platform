const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        enum: [true, false]
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
