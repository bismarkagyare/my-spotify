import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";

const CallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      // Send the code to the backend for token exchange
      axios
        .post("http://localhost:3000/callback", { code })
        .then((response) => {
          // Store the access token in localStorage or context
          localStorage.setItem("access_token", response.data.access_token);
          // Redirect to the dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          // Redirect to login if there's an error
          navigate("/login");
        });
    } else {
      // Redirect to login if no code is found
      navigate("/login");
    }
  }, [navigate]);

  return <Loader message="Authenticating..." />; // Show a loading spinner while processing
};

export default CallbackHandler;