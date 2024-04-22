const express = require("express");
const router = express.Router();


const {
    updateProfile,
    deleteAccount,
    updateProfilePicture,
    getUserDetails,
    getRentedEquipments,
    getOwnEquipment,
} = require("../controllers/Profile");

const { auth } = require("../middlewares/auth");


router.delete("/delete-account", auth, deleteAccount);
router.put("/update-profile", auth, updateProfile);
router.put("/update-profile-picture", auth, updateProfilePicture);
router.get("/get-user-details", auth, getUserDetails);
router.get("/get-rented-equipments", auth, getRentedEquipments);
router.get("/get-own-equipments", auth, getOwnEquipment);


module.exports = router;