
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV file path:", path.join(__dirname, '.env'));
console.log("Environment variables loaded:", {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  HAS_SECRET: !!process.env.SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
});

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