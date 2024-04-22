const Equipment = require("../models/Equipment");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
    try {
        const {
            gender = "",
            dateOfBirth = "",
            contactNumber = ""
        } = req.body;

        const id = req.user.id;

        // we have user id so we can fetch profile id using that
        const userDetail = await User.findById(id);
        const profileId = userDetail.additionalDetails;
        const profile = await Profile.findById(profileId);

        profile.dateOfBirth = dateOfBirth;
        profile.gender = gender;
        profile.contactNumber = contactNumber;

        await profile.save();

        //Now just for testing we can check updated details
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to Update Profile",
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Found"
            });
        }

        // Kisis se equipment rent pr liye hai tho id delete nahi kar skate
        const rentedEquipmentSize = user.rentedEquipments.length;
        if (rentedEquipmentSize > 0) {
            return res.status(401).json({
                success: false,
                message: "You have taken Equipments on Rent so We are not able to delete Your account"
            })
        }

        //if any uploaded Equipment is on rent then we cannot delete the account
        for (const equipmentId of user.equipments) {

            const equipmentDetails = await Equipment.findById(equipmentId);

            if (!equipmentDetails.customer) {
                return res.status(400).json({
                    success: false,
                    message: "You Have given Your Equipment on rent so You cannot delete the Account",
                })
            }
        }

        //If all the validation didnt hit means we can delete the account but firstly we have delete these--->
        //Delete Profile
        const profileId = user.additionalDetails;
        await Profile.findByIdAndDelete(profileId);

        //Delete all equipments which is uploaded by the user
        for (const equipmentId of user.equipments) {
            await Equipment.findByIdAndDelete(equipmentId);
        }

        //Now deleteing the account
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Account Deleted successFully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to Delete Account",
        })
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
        const profilePicture = req.files.profilePicture;
        const userId = req.user.id;

        const uploadImageToCloudinaryResponse = await uploadImageToCloudinary(
            profilePicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        console.log(uploadImageToCloudinary)

        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            { image: uploadImageToCloudinaryResponse.secure_url },
            { new: true }
        );

        console.log(updatedUserDetails);

        return res.status(200).json({
            success: true,
            message: "Image updated SuccessFully",
            updatedUserDetails: updatedUserDetails
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to update Profile Picture",
            error: err.message
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Data Fetched SuccessFully",
            data: userDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Fetching User Details",
        })
    }
}

exports.getRentedEquipments = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate({
            path: "rentedEquipments",
            populate: {
                path: "owner",
                // path: "booking"
            }
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.rentedEquipments
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Fetching All Rented Equipments",
            error: err.message
        });
    }
}

exports.getOwnEquipment = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate({
            path: "equipments",
            populate: {
                path: "customer",
                populate: {
                    path: "booking"
                }
            }
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }

        return res.status(200).json({
            success: true,
            ownEquipment: userDetails.equipments
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Fetching Users Own Equipments",
        });
    }
}

