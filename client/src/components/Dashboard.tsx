import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
  
      if (code) {
        try {
          const response = await axios.get(`http://localhost:3000/callback?code=${code}`);
          localStorage.setItem('access_token', response.data.access_token); 
          setAccessToken(response.data.access_token);
          navigate('/dashboard')
        } catch (error) {
          console.error('Error fetching access token:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
  
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
    } else {
      fetchAccessToken();
    }
  }, [location, navigate]);

  if (!accessToken) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to your Spotify Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
