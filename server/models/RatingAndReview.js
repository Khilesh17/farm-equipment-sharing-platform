const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Equipment"
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);

