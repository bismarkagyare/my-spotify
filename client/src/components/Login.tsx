import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-3xl mb-6 font-bold">My Spotify Profile</h1>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
        >
          {loading ? "Logging in..." : "Log in to Spotify"}
        </button>
      </div>
    </div>
  );
};

export default Login;
