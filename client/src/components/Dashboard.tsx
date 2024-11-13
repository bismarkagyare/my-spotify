import Loader from "./loader/Loader";
import useAuth from "@/hooks/useAuth";
import Layout from "@/layout";

const Dashboard = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!accessToken) return null;

  return <Layout />;
};

export default Dashboard;
