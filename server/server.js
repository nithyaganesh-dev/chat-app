import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import connectDB from "./configs/db.config.js";
import userRouter from "./routes/user.routes.js";

// Create express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);

// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
