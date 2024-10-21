const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-3xl mb-6 font-bold">My Spotify Profile</h1>
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-all"
        >
          Log in to Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
