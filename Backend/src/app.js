require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://127.0.0.1:5173"]})); // For cookies & port r running on different ports

// Routes
const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

module.exports = app;
