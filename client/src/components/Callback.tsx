import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Callback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .get(`http://localhost:3000/callback?code=${code}`)
        .then((response) => {
          console.log("response from server", response.data)
          const {access_token, refresh_token} = response.data;

          localStorage.setItem("access_token", access_token)
          localStorage.setItem("refresh_token", refresh_token)

          navigate('/dashboard');
        })
        .catch((error) => {
          console.error("Error exchanging code:", error)
          navigate('/login')
        })
    } else {
      navigate('/login')
    }
  }, [navigate])


  return (
    <div>Loading...</div>
  )
}

export default Callback