import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "@/configs/baseUrl";
import { SpotifyArtist, SpotifyPlaylist, SpotifyProfile, SpotifyTrack } from "@/types/common";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

//request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post("https://localhost:3000/refresh_token", { refreshToken });

        const { access_token, refresh_token } = response.data;

        localStorage.setItem("access_token", access_token);

        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const getUserProfile = async (): Promise<SpotifyProfile> => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const getUserPlaylists = async (): Promise<SpotifyPlaylist[]> => {
  try {
    const response = await api.get("/me/playlists");
    return response.data.items;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw error;
  }
};

export const getFollowedArtists = async (): Promise<SpotifyArtist[]> => {
  try {
    const response = await api.get("/me/following?type=artist");
    return response.data.artists.items;
  } catch (error) {
    console.error("Error fetching followed artists:", error);
    throw error;
  }
};

export const getTopArtists = async (timeRange: string = "long_term"): Promise<SpotifyTrack[]> => {
  try {
    const response = await api.get(`/me/top/artists?time_range=${timeRange}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    throw error;
  }
};

export const getTopTracks = async (timeRange: string): Promise<SpotifyTrack[]> => {
  try {
    const response = await api.get(`/me/top/tracks?time_range=${timeRange}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw error;
  }
};