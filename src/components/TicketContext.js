// TicketContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://65756352b2fbb8f6509d07ea.mockapi.io/v1/ticket');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const updateTicket = async (updatedTicket, selectedImage) => {
    try {
      if (updatedTicket.id) {
        // If the ticket has an ID, it already exists, so update it
        await axios.put(`https://65756352b2fbb8f6509d07ea.mockapi.io/v1/ticket/${updatedTicket.id}`, updatedTicket);
        setTickets((prevTickets) =>
          prevTickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
        );
      } else {
        // If the ticket doesn't have an ID, it's new, so add it
        const response = await axios.post('https://65756352b2fbb8f6509d07ea.mockapi.io/v1/ticket', {
          ...updatedTicket,
          photo: selectedImage || '', // Add the selected image URI to the ticket data
        });
        // Add the new ticket to the state
        setTickets([...tickets, response.data]);
      }
    } catch (error) {
      console.error('Error updating/creating ticket:', error);
    }
  };
  
  
  

  return (
    <TicketContext.Provider value={{ tickets, updateTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};

export { TicketProvider, useTicketContext };
