import { useState, useEffect } from 'react';
import { TicketType } from '../types/ticket';

type TicketPrice = {
  price: number;
};

export function useTicketPrice() {
  const [ticketPrice, setTicketPrice] = useState<TicketPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      try {
        // First check for active ticket in localStorage (set by admin dashboard)
        const activeTicket = localStorage.getItem('activeTicket');
        if (activeTicket) {
          try {
            const parsedTicket = JSON.parse(activeTicket);
            setTicketPrice({
              price: parsedTicket.price
            });
            setIsLoading(false);
            return; // Use the admin-set ticket price
          } catch (parseError) {
            console.error('Error parsing active ticket:', parseError);
            // Continue to try other methods
          }
        }
        
        // Try to fetch from API
        try {
          const response = await fetch('/api/tickets/active');
          
          if (response.ok) {
            const data = await response.json();
            setTicketPrice(data);
            localStorage.setItem('activeTicket', JSON.stringify(data));
            return;
          }
        } catch (apiError) {
          console.error('Error fetching from API:', apiError);
          // Continue to default price
        }
        
        // Set default price if all else fails
        setTicketPrice({
          price: 60
        });
      } catch (error) {
        console.error('Error in ticket price handling:', error);
        setError('Failed to fetch ticket price');
        
        // Set default price if there's an error
        setTicketPrice({
          price: 60.00
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketPrice();
    
    // Listen for storage events to update price when changed in admin
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeTicket' && e.newValue) {
        try {
          const parsedTicket = JSON.parse(e.newValue);
          setTicketPrice({
            price: parsedTicket.price
          });
        } catch (error) {
          console.error('Error parsing updated ticket:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { ticketPrice, isLoading, error };
}
