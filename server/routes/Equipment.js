const express = require("express");
const router = express.Router();

const {
    createEquipment,
    editEquipment,
    deleteEquipment,
    getAllEquipments,
    getFullEquipmentDetails
} = require("../controllers/Equipment");

const { auth } = require("../middlewares/auth");


router.post("/create-equipment", auth, createEquipment);
router.put("/edit-equipment", auth, editEquipment);
router.delete("/delete-equipment", auth, deleteEquipment);
router.get("/get-all-equipment", getAllEquipments);
router.get("/get-equipment-details", getFullEquipmentDetails);

module.exports = router;