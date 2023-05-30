import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button style={styles.navLink} onClick={handleLogout}>
      Logout
    </button>
  )
}
    const styles = {
    navLink: {
        color: '#fff',
         textDecoration: 'none',
         padding: '5px 10px',
         borderRadius: '4px',
         backgroundColor: '#ff4b2b',
         transition: 'background 0.3s ease','&:hover': {
         background: '#ff34330',
        }},
    };

export default Logout;
