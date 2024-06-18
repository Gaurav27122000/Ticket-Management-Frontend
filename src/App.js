import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import TicketsPage from './Ticket/TicketsPage';
import './App.css';
import RegisterPage from './Register/RegisterPage';
import TicketChatPage from './TicketChat/TicketChatPage';
import Profile from './components/user/Profile';

const App = () => {

  const ProtectedRoute = () => {
    const token=sessionStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return <TicketsPage token={token}/>;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tickets" element={<ProtectedRoute />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:ticketId" element={<TicketChatPage/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
