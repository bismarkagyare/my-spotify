import express from "express";
import cors from "cors";
import axios from "axios";
import querystring from "querystring";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Function to require environment variables
const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Function to generate a secure random state
const generateState = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Function to create Spotify authorization URL
const createAuthorizationUrl = () => {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-read-recently-played",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-read",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ].join(" ");
  const state = generateState();
  const redirectUri = requireEnv("SPOTIFY_REDIRECT_URI");

  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
  });

  return `https://accounts.spotify.com/authorize?${queryParams}`;
};

// Function to exchange authorization code for tokens
const exchangeCodeForTokens = async (code) => {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const redirectUri = requireEnv("SPOTIFY_REDIRECT_URI");

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    },
  };

  try {
    const response = await axios.post(authOptions.url, querystring.stringify(authOptions.data), {
      headers: authOptions.headers,
    });
    return response.data;
  } catch (error) {
    console.error("Authentication Error:", error.response?.data || error.message);
    throw new Error("Authentication failed");
  }
};

// Function to refresh access token
const refreshAccessToken = async (refreshToken) => {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
  };

  try {
    const response = await axios.post(authOptions.url, querystring.stringify(authOptions.data), {
      headers: authOptions.headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data || error.message);
    throw new Error("Token refresh failed");
  }
};

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());

// Route to initiate login
app.get("/login", (req, res) => {
  const authorizationUrl = createAuthorizationUrl();
  res.redirect(authorizationUrl);
});

// Route to handle callback
app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const tokens = await exchangeCodeForTokens(code);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Route to refresh token
app.post("/refresh_token", async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const tokens = await refreshAccessToken(refresh_token);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: "Token refresh failed" });
  }
});

// Start the server
const startServer = (port = 3000) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Initialize and start the server
startServer();


// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import path from "path";
// import authRoutes from "./routes/authRoute.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config({ path: path.join(__dirname, ".env") });

// console.log("ENV file path:", path.join(__dirname, '.env'));
// console.log("Environment variables loaded:", {
//   SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
//   HAS_SECRET: !!process.env.SPOTIFY_CLIENT_SECRET,
//   REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
// });

// // Express App Setup
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Use routes
// app.use("/", authRoutes);

// // Start the server
// const startServer = (port = 3000) => {
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// };

// // Initialize and start the server
// startServer();
