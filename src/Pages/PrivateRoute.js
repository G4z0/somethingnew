import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/main')
    }
  }, [token, navigate]);
  console.log(token)

  if (!token) {
    return null;
  }

  return children;
}

export default PrivateRoute;