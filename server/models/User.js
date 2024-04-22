const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment"
    }],
    rentedEquipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment"
    }],
    token: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }

});

module.exports = mongoose.model("User", userSchema);