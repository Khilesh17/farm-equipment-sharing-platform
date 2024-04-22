const RatingAndReview = require("../models/RatingAndReview");
const Equipment = require("../models/Equipment");
const { Mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
    try{
        const userId = req.user.id;
        const { rating, review, equipmentId } = req.body;

        //checking that user ever rented this equipment or not
        const equipmentDetails = await Equipment.findOne({
            _id: equipmentId,
            customer: { $elemMatch: { $eq: userId } },
        });

        if (!equipmentDetails) {
            return res.status(404).json({
                success: false,
                message: "User is Never Rented this Equipment"
            })
        }

        //Now checking that user already reviewed or not
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            equipment: equipmentId
        })

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Equipment is already reviewed by the user"
            })
        }

        //Now creating the rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            equipment: equipmentId
        });

        // updating equipment rating
        const updatedEquipmentDetails = await Equipment.findByIdAndUpdate(
            { _id: equipmentId },
            {
                $push: {
                    ratingAndReview:ratingReview._id
                }
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            ratingReview
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to create Rating",
            error: err.message
        })
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        const equipmentId = req.body.equipmentId;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    equipment: new Mongoose.Types.ObjectId(equipmentId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Average rating Fetched Successfully",
                averageRating: result[0].averageRating
            })
        }

        //if No rating exist
        return res.status(200).json({
            success: true,
            message: `Average Rating is 0 , no rating given till now`,
            averageRating: 0
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to get Average Rating",
            error: err.message
        })
    }
}

exports.getAllRating = async (req, res) => {
    try {
        const { equipmentId } = req.body;
        
        if (!equipmentId) {
            return res.status(404).json({
                success: false,
                message: "Equipment id Required for getting all the Rating and Reviews"
            })
        }

        const equipmentDetails = await Equipment.findById(equipmentId);

        const allReview = equipmentDetails.ratingAndReview;

        return res.status(200).json({
            success: true,
            message: "All reviews Fetched SuccessFully",
            data: allReview
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to get All Rating",
            error: err.message
        })
    }
}