import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .get(`http://localhost:3000/callback?code=${code}`)
        .then((response) => {
          console.log("response from server", response.data);
          const { access_token, refresh_token } = response.data;

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error exchanging code:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-white/25">
      <div className="flex flex-col space-y-6 items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent" />
        <span className="text-center text-gray-700">loading please wait ....</span>
      </div>
    </div>
  );
};

export default Callback;
