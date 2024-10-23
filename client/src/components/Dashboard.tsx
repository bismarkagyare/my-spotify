import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/ApiService";
import { queryKeys } from "@/lib/queryKeys";
import { FaSpinner } from "react-icons/fa";

interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

const Dashboard = () => {
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery<UserProfile, Error>({
    queryKey: [queryKeys.USERPROFILE],
    queryFn: getUserProfile,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-5xl text-green-500" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userProfile) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h1>Welcome to Your Spotify Dashboard</h1>
      <h2>{userProfile.display_name}</h2>
      {userProfile.images[0] && <img src={userProfile.images[0].url} alt="Profile" width="200" />}
      <p>Email: {userProfile.email}</p>
    </div>
  );
};

export default Dashboard;
