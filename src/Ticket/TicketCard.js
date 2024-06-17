import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
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
            <MenuItem onClick={() => handleMenuItemClick('Open')}>Open</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('In Progress')}>In Progress</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Closed')}>Closed</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
