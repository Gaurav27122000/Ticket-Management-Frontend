import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import CreateTicketModal from './CreateTicketModal';
import Header from '../components/layout/Header';

const TicketsPage = ({token}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupedTickets, setGroupedTickets] = useState({ open: [], unassigned: [], closed: [], 'on hold':[] });

  const handleCreateTicket = (newTicket) => { 
    setGroupedTickets((prevGroupedTickets) => ({
      ...prevGroupedTickets,
      [newTicket.status.toLowerCase()]: [...prevGroupedTickets[newTicket.status.toLowerCase()], {...newTicket,id:1000}],
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://ticket-management-fi6w.onrender.com/ticket/getTickets', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Referrer-Policy': 'strict-origin-when-cross-origin'
          },
        });
        setTickets(response.data);
        const ticket = response.data;
        const grouped = {
          open: ticket.filter(t => t.status === 'OPEN'),
          unassigned: ticket.filter(t => t.status === 'UNASSIGNED'),
          closed: ticket.filter(t => t.status === 'CLOSED'),
          ['on hold']: ticket.filter(t => t.status === 'ON HOLD'),
        };
        setGroupedTickets(grouped);
        console.log(grouped);
        setLoading(false);
      } catch (error) {
        // Check if error is 405 Method Not Allowed
        if (error.response && error.response.status === 401) {
          sessionStorage.removeItem('token');
          navigate('/login')
        }
         else {
          console.error('Error fetching tickets:', error.message);
        }
      }
    };

    fetchTickets();
  }, []);


  const handleUpdateStatus = (ticketId, oldStatus, newStatus) => {
    setGroupedTickets(prevGroupedTickets => {
      const updatedTickets = {
        open: prevGroupedTickets.open.filter(ticket => ticket.id !== ticketId),
        unassigned: prevGroupedTickets.unassigned.filter(ticket => ticket.id !== ticketId),
        ['on hold']: prevGroupedTickets['on hold'].filter(ticket => ticket.id !== ticketId),
        closed: prevGroupedTickets.closed.filter(ticket => ticket.id !== ticketId),
      };
      updatedTickets[newStatus.toLowerCase()] = [
        ...updatedTickets[newStatus.toLowerCase()],
        {
          ...prevGroupedTickets[oldStatus.toLowerCase()].find(ticket => ticket.id === ticketId),
          status: newStatus,
        },
      ];

      return updatedTickets;
    });

  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    console.log("Source",source);
    const updatedTickets = Array.from(tickets);

    const [movedTicket] = updatedTickets.splice(source.index, 1);
    movedTicket.status = destination.droppableId.toUpperCase();
    updatedTickets.splice(destination.index, 0, movedTicket);

    setTickets(updatedTickets);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
    <Container maxWidth="lg">
      <Header/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" style={{ marginBottom: '1em' }}>Tickets</Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          Create Ticket
        </Button>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer component={Paper}>
          <Table  style={{ tableLayout: 'fixed' }} >
            <TableHead>
              <TableRow>
                <TableCell>OPEN</TableCell>
                <TableCell>UNASSIGNED</TableCell>
                <TableCell>ON HOLD</TableCell>
                <TableCell>CLOSED</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{verticalAlign: 'top' }}>
                  <Droppable droppableId="OPEN">
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {groupedTickets.open.map((ticket, index) => (
                          <Draggable key={ticket.id.toString()} draggableId={ticket.id.toString()} index={index}>
                            {(provided) => (
                              <TicketCard key={ticket.id} ticket={ticket} onUpdateStatus={handleUpdateStatus} />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </TableCell>
                <TableCell style={{verticalAlign: 'top' }}>
                  <Droppable droppableId="UNASSIGNED">
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {groupedTickets.unassigned.map((ticket, index) => (
                          <Draggable key={ticket.id.toString()} draggableId={ticket.id.toString()} index={index}>
                            {(provided) => (
                              <TicketCard key={ticket.id} ticket={ticket} onUpdateStatus={handleUpdateStatus} />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </TableCell>
                <TableCell style={{verticalAlign: 'top'}}>
                  <Droppable droppableId="ON HOLD">
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {groupedTickets['on hold'].map((ticket, index) => (
                          <Draggable key={ticket.id.toString()} draggableId={ticket.id.toString()} index={index}>
                            {(provided) => (
                              <TicketCard key={ticket.id} ticket={ticket} onUpdateStatus={handleUpdateStatus} />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </TableCell>
                <TableCell style={{verticalAlign: 'top'}}>
                  <Droppable droppableId="CLOSED">
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {groupedTickets.closed.map((ticket, index) => (
                          <Draggable key={ticket.id.toString()} draggableId={ticket.id.toString()} index={index}>
                            {(provided) => (
                              <TicketCard key={ticket.id} ticket={ticket} onUpdateStatus={handleUpdateStatus} />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DragDropContext>
    </Container>


    <CreateTicketModal isOpen={isModalOpen} onClose={handleCloseModal} onCreate={handleCreateTicket} />
    </>
  );
};

export default TicketsPage;