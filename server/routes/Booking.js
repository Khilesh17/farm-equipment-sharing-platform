const express = require("express");
const router = express.Router();

const {
    createBooking,
    endBooking
} = require("../controllers/Booking");

const { auth } = require("../middlewares/auth");

router.post("/create-booking", auth, createBooking);
router.put("/end-booking", auth, endBooking);

module.exports = router;