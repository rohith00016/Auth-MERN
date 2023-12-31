import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import NavBar from './NavBar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    server: '', // New state for server-side errors
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
      server: '', // Clear server-side errors when the user starts typing
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', formData);

        if (response.data && response.data.token && response.data.userId) {
          localStorage.setItem('token', response.data.token);

          navigate(`/dashboard/${response.data.userId}`, {
            state: { user: response.data },
          });
        } else {
          console.error('Invalid response from the server:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;

          setErrors({
            ...errors,
            server: responseData.error || 'An error occurred during login',
          });
        } else {
          console.error('Login error:', error);
        }
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              autoComplete="current-username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
            />
            <span className="error-message">{errors.username}</span>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
            />
            <span className="error-message">{errors.password}</span>
            {errors.server && <div className="error-message">{errors.server}</div>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          
        </form>
      </div>
    </>
  );
};

export default Login;
