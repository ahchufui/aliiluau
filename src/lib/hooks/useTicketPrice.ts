import { useState, useEffect } from 'react';
import { TicketType } from '../types/ticket';

type TicketPrices = {
  adultPrice: number;
  childPrice: number;
  allTickets: TicketType[];
};

export function useTicketPrice() {
  const [ticketPrices, setTicketPrices] = useState<TicketPrices | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketPrices = async () => {
      try {
        // Fetch tickets from the API route
        const response = await fetch('/api/tickets');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        
        const allTickets: TicketType[] = await response.json();
        
        // Find adult and child tickets
        const adultTicket = allTickets.find(ticket => ticket.name.toLowerCase().includes('adult'));
        const childTicket = allTickets.find(ticket => ticket.name.toLowerCase().includes('child'));
        
        setTicketPrices({
          adultPrice: adultTicket?.price || 60,
          childPrice: childTicket?.price || 40,
          allTickets: allTickets
        });
      } catch (error) {
        console.error('Error in ticket price handling:', error);
        setError('Failed to fetch ticket prices');
        
        // Set default prices if there's an error
        setTicketPrices({
          adultPrice: 60,
          childPrice: 40,
          allTickets: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketPrices();
    
    // No need to listen for storage events as we're reading directly from the file
  }, []);

  return { ticketPrices, isLoading, error };
}
