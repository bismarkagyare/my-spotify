import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = new URLSearchParams(location.search).get("code");
      console.log("current code", code);

      if (code) {
        try {
          console.log("attempting token exchange... ");
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/callback?code=${code}`);

          console.log("token exchange successful", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          setAccessToken(response.data.access_token);
          navigate("/dashboard");
        } catch (error) {
          console.error("Error fetching access token:", error);
          navigate("/login");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    };

    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      setIsLoading(false);
    } else {
      fetchAccessToken();
    }
  }, [location, navigate]);

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    navigate("/login");
  };

  return { accessToken, isLoading, logout };
};

export default useAuth;
