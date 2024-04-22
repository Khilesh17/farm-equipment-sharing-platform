const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const User = require("../models/User");

exports.createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            equipmentId,
            startDate,
            endDate,
        } = req.body;

        //Checking for the user 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }

        //Now cheking for equipmnent  
        const equipment = await Equipment.findById(equipmentId);

        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found"
            })
        }

        // Check if the user is trying to book their own equipment
        if (equipment.owner.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot book your own equipment"
            });
        }

        //Now calculating total price
        const oneDayPrice = equipment.pricePerDay;
        const oneDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round(Math.abs((new Date(endDate) - new Date(startDate)) / oneDay)) + 1;

        const totalPrice = oneDayPrice * totalDays;

        // Now creating the booking
        const booking = await Booking.create({
            customer: userId,
            equipment: equipmentId,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice,
            active: true
        })

        //Now pushing the booking in equipment modal
        equipment.booking.push(booking._id);
        equipment.activeBooking = true;
        await equipment.save();

        //Updating the users rentedEquipment array
        user.rentedEquipments.push(equipmentId);
        await user.save();

        // Find the booking by ID and populate its fields
        const populatedBooking = await Booking.findById(booking._id)
            .populate('equipment')
            .populate('customer')
            .exec();

        return res.status(201).json({
            success: true,
            message: "Equipment booked successfully",
            booking: populatedBooking
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to create Booking",
            error: err.message
        })
    }
}

exports.endBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if the booking is already ended
        if (!booking.active) {
            return res.status(400).json({
                success: false,
                message: "Booking has already ended"
            });
        }

        // Update the booking status to indicate that it has ended
        booking.active = false;
        await booking.save();


        //now updating the Equipment active booking
        const equipmentId = booking.equipment;
        const equipment = await Equipment.findById(equipmentId);

        equipment.activeBooking = false;
        await equipment.save();


        //populating 
        const populatedBooking = await Booking.findById(bookingId)
            .populate('equipment')
            .populate('customer')
            .exec();

        return res.status(200).json({
            success: true,
            message: "Booking ended successfully",
            booking: populatedBooking
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not able to End Booking",
            error: err.message
        })
    }
}


