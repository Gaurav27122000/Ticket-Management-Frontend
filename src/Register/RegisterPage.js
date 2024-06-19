import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });

      console.log('Registration successful', response.data);
      setError('');
      setMessage("Registration successful")
    } catch (error) {
      console.log("ERROR",error.response?.data?.detail);
      setError(error.response.data.detail);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Register
        </Typography>
        <form onSubmit={handleRegister}>
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
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <Box mt={2}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {message && <Typography color="success.main">{message}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={3}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Box>
        </form>
      </Box>
      <Box mt={3}>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')} fullWidth>
        Login
      </Button>
    </Box>
    </Container>
  );
};

export default RegisterPage;
