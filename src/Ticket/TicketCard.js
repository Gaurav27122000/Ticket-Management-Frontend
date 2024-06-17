import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TicketCard = ({ ticket, onUpdateStatus }) => {
  const [status, setStatus] = useState(ticket.status);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (newStatus) => {
    setStatus(newStatus);
    setAnchorEl(null);
    onUpdateStatus(ticket.id, newStatus);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(
        `https://ticket-management-fi6w.onrender.com/ticket/updateTicket/${ticket.id}`,
        { status: newStatus },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setStatus(newStatus);
      onUpdateStatus(ticket.id, ticket.status, newStatus); // Update the parent component
    } catch (error) {
      console.error('Error updating ticket status:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {ticket.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {ticket.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Ticket ID: {ticket.id}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Branch: {ticket.restaurant_branch}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            Status:
          </Typography>
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
          >
            {status}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleStatusChange('OPEN')}>Open</MenuItem>
            <MenuItem onClick={() => handleStatusChange('UNASSIGNED')}>Unassigned</MenuItem>
            <MenuItem onClick={() => handleStatusChange('CLOSED')}>Closed</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
