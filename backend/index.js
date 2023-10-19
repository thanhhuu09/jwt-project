const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

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
const authRoute = require("./routes/auth");
app.use("/v1/auth", authRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
