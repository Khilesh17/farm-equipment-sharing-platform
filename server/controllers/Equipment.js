const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const ratingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createEquipment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            equipmentName,
            equipmentDetail,
            pricePerDay,
            // availableDates,
            tag,
            location
        } = req.body;

        
        if (!userId || !equipmentName || !equipmentDetail ||
            !pricePerDay || !tag || !location) {
            return res.status(401).json({
                success: false,
                message: "All Fields Required"
            })
        }

        //Images ka handle
        if (!req.files || !req.files.image) {
            return res.status(404).json({
                success: false,
                message: "No image has been uploaded"
            });
        }

        let allImages = req.files.image;

        if (!Array.isArray(allImages)) {
            allImages = [allImages];
        }

        const imageURLs = [];

        for (const image of allImages) {
            const imageURL = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME
            );

            imageURLs.push(imageURL.secure_url);
        }

        // console.log("ImageUrls : ", imageURLs);

        //Now creating the equipment
        const equipment = await Equipment.create({
            equipmentName,
            equipmentDetail,
            pricePerDay,
            tag,
            location,
            // availableDates: datesAsDateObjects,
            owner: userId,
            equipmentImages: imageURLs,
            activeBooking: false
        })

        if (!equipment) {
            return res.status(400).json({
                success: false,
                message: "Not able to create entry for Equipment in Database"
            })
        }

        //Now updating the User 
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: {
                    equipments: equipment._id
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Equipment Creating Completed",
            equipment: equipment,
            user: updatedUser
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to create Equipment Entry",
            error: error.message
        })
    }
}

exports.editEquipment = async (req, res) => {
    try {
        const { equipmentId } = req.body;
        const updates = req.body;

        const equipment = await Equipment.findById(equipmentId);

        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment Not found"
            })
        }

        //Uploading and saving Files
        const images = req.files.image;
        
        const uploadPromise = images.map(async image => {
            //Cloudinary me dalege
            const imageURL = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME
            );

            equipment.equipmentImages.push(imageURL.secure_url);
        });

        //Waiting for all uploads to complete
        await Promise.all(uploadPromise);
        

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag") {
                    equipment[key] = [... equipment[key], ...updates[key]];
                }
                else {
                    equipment[key] = updates[key];
                }
            }
        }

        await equipment.save();

        return res.status(200).json({
            success: true,
            message: "Equipment Updated SuccessFully",
            equipment: equipment
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to edit the Equipment details",
            error: error.message
        })
    }
}

exports.deleteEquipment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { equipmentId } = req.body;

        const equipment = await Equipment.findById(equipmentId);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not Found"
            })
        }

        //If the Equipmetn is on the booking then we cannot delete the equipment entry

        if (equipment.activeBooking) {
            return res.status(401).json({
                success: false,
                message: "Equipment is currently on booking period"
            })
        }

        //Now we can delete the Equipment
        await Equipment.findByIdAndDelete(equipmentId);

        //Now updating the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    equipments: equipmentId
                }
            }
        )
            .populate("equipments")
            .exec();

        return res.status(200).json({
            success: true,
            messaeg: "Equipment Deleted SuccessFully",
            userDetails: updatedUser
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to delete the Equipment"
        })
    }
}

exports.getAllEquipments = async (req, res) => {
    try {
        const allEquipments = await Equipment.find();

        if (!allEquipments || allEquipments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No equipments Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All Equipment Fetched SuccessFully",
            allEquipments: allEquipments
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able ton fetch all Equipments",
            error: err.message
        })
    }
}

exports.getFullEquipmentDetails = async (req, res) => {
    try {
        const equipmentId = req.body.equipmentId;

        const equipmentDetails = await Equipment.findById(equipmentId)
            .populate({
                path: "owner",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("ratingAndReview");

        if (!equipmentDetails) {
            return res.status(404).json({
                success: false,
                message: "Equipment details not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Equipment Details Fetched SuccessFully",
            equipmentDetails: equipmentDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to fetch Full Details of the Equipment",
            error: err.message
        })
    }
}
