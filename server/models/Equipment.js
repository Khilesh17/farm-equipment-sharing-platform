const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
    equipmentName: {
        type: String
    },
    equipmentDetail: {
        type: String
    },
    equipmentImages: {
        type: [String]
    },
    pricePerDay: {
        type: Number
    },
    // availableDates: [{
    //     type: Date
    // }],
    tag: {
        type: [String],
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    customer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    }],
    ratingAndReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    activeBooking: {
        type: Boolean,
        enum: [true, false]
    }
})

module.exports = mongoose.model("Equipment", equipmentSchema);