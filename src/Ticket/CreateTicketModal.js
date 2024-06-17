import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const initialFormData = {
  title: '',
  description: '',
  restaurantBranch: '',
  platform: '',
  status: '',
};

const branchOptions = [
  { value: 'Bandra', label: 'BANDRA' },
  { value: 'Andheri East', label: 'ANDHERI EAST' },
  { value: 'Andheri West', label: 'ANDHERI WEST' },
  { value: 'Borivali West', label: 'BORIVALI WEST' },
  { value: 'Ghatkopar', label: 'GHATKOPAR' },
];

const platformOptions = [
  { value: 'zomato', label: 'ZOMATO' },
  { value: 'google', label: 'GOOGLE' },
  { value: 'swiggy', label: 'SWIGGY' },
];

const statusOptions = ['Open', 'Unassigned', 'Closed', "On Hold"];

const CreateTicketModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'https://ticket-management-fi6w.onrender.com/ticket/addTicket',
        {
          tittle: formData.title,
          description: formData.description,
          platform: formData.platform.toUpperCase(),
          restaurant_branch: formData.restaurantBranch.toUpperCase(),
          status: formData.status.toUpperCase(),
          name: sessionStorage.getItem('username')
        },
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      // Assuming the API returns the newly created ticket data, you can handle it here
      console.log('New ticket created:', response.data);

      // Close the modal and reset form data
      onClose();
      onCreate(formData);
      setFormData(initialFormData);

      // Call the parent onCreate function to update tickets list
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create New Ticket
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Restaurant Branch</InputLabel>
          <Select
            value={formData.restaurantBranch}
            onChange={handleChange}
            name="restaurantBranch"
          >
            {branchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Platform</InputLabel>
          <Select
            value={formData.platform}
            onChange={handleChange}
            name="platform"
          >
            {platformOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Ticket Status</InputLabel>
          <Select
            value={formData.status}
            onChange={handleChange}
            name="status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          disabled={!formData.title || !formData.description || !formData.restaurantBranch || !formData.platform || !formData.status}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTicketModal;
