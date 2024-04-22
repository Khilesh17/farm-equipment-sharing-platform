const express = require("express");
const app = express();
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//Importing Routers
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const contactUsRoutes = require("./routes/Contact");
const equipmentRoutes = require("./routes/Equipment");
const bookingRoutes = require("./routes/Booking");

const PORT = process.env.PORT || 4000;

database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://localhost:3000",
        credentials: true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

// Cloudinary Connection
cloudinary.cloudinaryConnect();


//Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoutes);
app.use("/api/v1/equipment", equipmentRoutes);
app.use("/api/v1/booking", bookingRoutes);

// Default Routes
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is Up and Running....."
    })
})

app.listen(PORT, () => {
    console.log(`App is Running at ${PORT}`);
})
