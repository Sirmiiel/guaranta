import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './style.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the RewardsPage
    navigate('/profile');
  };

  return (
    <div className="login-root">
      <div className="login-container">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-description">Log in to access your records and track your payment history.</p>
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
