import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://api.spotify.com/v1";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  //timeout: 100000,
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

        const { access_token } = response.data;

        localStorage.setItem("access_token", access_token);
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const getUserProfile = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
