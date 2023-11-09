const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());

// Giúp biến đổi json từ request thành object
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB.");
});

//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/users", userRoute);
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
