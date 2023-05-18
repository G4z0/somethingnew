import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/LogIn';
import Home from './Pages/Home';
import Main from './Pages/Main';

const AuthenticatedRedirect = () => {
  const isAuthenticated = false; // Replace with your authentication check logic
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Main');
    } else {
      navigate('/Home');
    }
  }, [isAuthenticated, navigate]);

  return null; 
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<AuthenticatedRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
