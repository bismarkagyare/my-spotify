import crypto from "crypto";
import querystring from "querystring";
import axios from "axios";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// // Load environment variables
// dotenv.config({ path: path.join(__dirname, "../../.env") });

// Function to require environment variables
const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Generate a secure random state
export const generateState = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Create Spotify authorization URL
export const createAuthorizationUrl = () => {
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

// Exchange authorization code for tokens
export const exchangeCodeForTokens = async (code) => {
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

// Refresh access token
export const refreshAccessToken = async (refreshToken) => {
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

// Route handlers
export const login = (req, res) => {
  const authorizationUrl = createAuthorizationUrl();
  res.redirect(authorizationUrl);
};

export const callback = async (req, res) => {
  try {
    const code = req.query.code;
    const tokens = await exchangeCodeForTokens(code);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const tokens = await refreshAccessToken(refresh_token);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: "Token refresh failed" });
  }
};
