// import axios from "axios";
// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

// const Callback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { setTokens } = useAuth();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const code = params.get("code");

//     if (code) {
//       axios
//         .get(`http://localhost:3000/callback?code=${code}`)
//         .then((response) => {
//           console.log("response from server", response.data);
//           const { access_token, refresh_token } = response.data;

//           setTokens(access_token, refresh_token);
          
//           navigate("/dashboard");
//         })
//         .catch((error) => {
//           console.error("Error exchanging code:", error);
//           navigate("/login");
//         });
//     } else {
//       navigate("/login");
//     }
//   }, [navigate, setTokens, location]);

//   return (
//     <div className="flex h-screen items-center justify-center bg-white/25">
//       <div className="flex flex-col space-y-6 items-center">
//         <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-600 border-t-transparent" />
//         <span className="text-center text-gray-700">Authenticating with Spotify...</span>
//       </div>
//     </div>
//   );
// };

// export default Callback;
