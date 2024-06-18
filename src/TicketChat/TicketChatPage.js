import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const TicketChatPage = () => {
  const {ticketId} = useParams();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://ticket-management-fi6w.onrender.com/chat/getChats/${ticketId}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`https://ticket-management-fi6w.onrender.com/ticket/getTicket/${ticketId}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setTicket(response.data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };


    fetchTicket();
    fetchMessages();
  }, [ticketId]);

  const handleAddMessage = async () => {
    try {
      const response = await axios.post(`https://ticket-management-fi6w.onrender.com/chat/addMessage`, {
        message: newMessage,
        ticket_id: ticketId,
      }, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      // Assuming the API returns the updated list of messages
      fetchMessages();
      setNewMessage(''); // Clear input after sending message
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  if (!ticket) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Side: Ticket Details */}
      <Box sx={{padding: '1em',maxHeight: '100vh', top:0, position: 'sticky', minWidth: '50px', borderRight: '1px solid #ccc' }}>
        <Typography variant="h5" gutterBottom>Ticket Details</Typography>
        <Typography variant="subtitle1">ID: {ticket.id}</Typography>
        <Typography variant="subtitle1">Title: {ticket.title}</Typography>
        <Typography variant="subtitle1">Description: {ticket.description}</Typography>
        <Typography variant="subtitle1">Status: {ticket.status}</Typography>
        <Typography variant="subtitle1">Restaurant Branch: {ticket.restaurant_branch}</Typography>
      </Box>

      {/* Right Side: Messages and Message Input */}
      <Box style={{ flex: '1 1 ', padding: '1em' }}>
        {/* Chat Messages */}
        <Typography variant="h5" gutterBottom>Chat Messages</Typography>
        
        <Paper style={{ minHeight:'85vh' ,overflowY: 'auto', padding: '1em' }}>
          {messages.length==0?
            <Typography variant="h6" align='center'>No Messages</Typography>
            :
            <List>
              {messages.map((message, index) => (
                <ListItem key={index} style={{ textAlign: 'left' }}>
                  <ListItemText
                    primary={message.message}
                    secondary={message.timestamp}
                    style={{
                      maxWidth: '40%',
                      marginLeft: message.sender === 'admin' ? 'auto' : 'unset',
                      marginRight: message.sender === 'user' ? 'auto' : 'unset',
                      backgroundColor: message.sender === 'admin' ? '#e0e0e0' : '#f0f0f0',
                      borderRadius: '10px',
                      padding: '10px',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          }
        </Paper>
        

        <Box sx={{ padding: '1em', position: 'sticky', justifyContent:'space-between', display:'flex', bottom: 0, zIndex: 1000, backgroundColor: '#fff' }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ marginBottom: '1em' }}
        />
        <IconButton color="primary" onClick={handleAddMessage} disabled={ticket.status==='CLOSED'}>
          <SendIcon />
        </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default TicketChatPage;