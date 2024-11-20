import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoute.js";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/", authRoutes);

// Start the server
const startServer = (port = 3000) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Initialize and start the server
startServer();