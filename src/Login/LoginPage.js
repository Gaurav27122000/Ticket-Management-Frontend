import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem('token') || '');

  useEffect(() => {
    const pingBackend = async () => {
      try {
        await axios.get('https://ticket-management-fi6w.onrender.com/ping'); // Replace with your backend's ping endpoint
        console.log('Backend server is running');
      } catch (error) {
        console.error('Error pinging the backend:', error);
      }
    };

    pingBackend();
    if (token) {
      navigate('/tickets');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('https://ticket-management-fi6w.onrender.com/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }
      });
      const token = response.data.access_token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      setToken(token);
      navigate("/tickets");
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  }

  return (
    <Container maxWidth="sm">
      <Box alignItems="center" mt={5}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Login
        </Typography>
          <Box mt={3}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Box>
        <Box mt={2}>
          <Button fullWidth variant="outlined" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
