import Loader from "./loader/Loader";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!accessToken) return null;

  return (
    <div>
      <h1>Welcome to your Spotify Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
