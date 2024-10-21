import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      // Fetch the user's profile information from Spotify
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          console.log('user data in dashboard', response.data)
          setUserProfile(response.data); // Set user profile data
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error.message);
        });
    }
  }, [access_token]);

  return (
    <div>
      <h1>Welcome to Your Spotify Dashboard</h1>
      {userProfile ? (
        <div>
          <h2>{userProfile.display_name}</h2>
          <img src={userProfile.images[0]?.url} alt="Profile" width="200px" />
          <p>{userProfile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
