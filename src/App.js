import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/LogIn';
import Home from './Pages/Home';
import Main from './Pages/Main';
import PrivateRoute from './Pages/PrivateRoute';

const AuthenticatedRedirect = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const tokenWatcher = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', tokenWatcher);

    return () => {
      window.removeEventListener('storage', tokenWatcher);
    };
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path="/" element={<AuthenticatedRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
