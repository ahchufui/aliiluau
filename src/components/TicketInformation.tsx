'use client';

import { useEffect, useState } from 'react';
import { TicketType } from '@/lib/types/ticket';

interface TicketInformationProps {
  className?: string;
}

export default function TicketInformation({ className = '' }: TicketInformationProps) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tickets');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to load ticket information');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTickets();
  }, []);

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {tickets.length === 0 ? (
        <p className="text-gray-600">No ticket information available at this time.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-lg text-teal-700">{ticket.name}</h3>
            <p className="text-gray-700">{ticket.description}</p>
            <p className="text-lg font-bold mt-2">${ticket.price} per person</p>
          </div>
        ))
      )}
    </div>
  );
}
