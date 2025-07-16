'use client';

import React, { useState, useEffect } from 'react';
import { FaTicketAlt } from 'react-icons/fa';

interface TicketType {
  id: string;
  name: string;
  price: string;
  description?: string;
}

interface TicketTypeSelectorProps {
  sessionId: number;
  onTicketSelect: (ticketId: string, ticketName: string, ticketPrice: string) => void;
  className?: string;
}

export default function TicketTypeSelector({ 
  sessionId, 
  onTicketSelect,
  className = '' 
}: TicketTypeSelectorProps) {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would fetch from an API endpoint that returns ticket types for a session
        // For now, we'll simulate with static data based on the session ID
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Different ticket types based on session ID (even vs odd)
        const isSpecialEvent = sessionId % 2 === 0;
        
        const mockTickets: TicketType[] = [
          {
            id: 'standard',
            name: 'Standard Experience',
            price: '129.00',
            description: 'Full luau experience with dinner and show'
          }
        ];
        
        // Add VIP ticket for special events
        if (isSpecialEvent) {
          mockTickets.push({
            id: 'vip',
            name: 'VIP Experience',
            price: '179.00',
            description: 'Premium seating, welcome drink, and photo opportunity with performers'
          });
        }
        
        // Add family ticket option for all events
        mockTickets.push({
          id: 'family',
          name: 'Family Package',
          price: '399.00',
          description: '2 adults and 2 children (ages 5-12)'
        });
        
        setTicketTypes(mockTickets);
        
        // Auto-select the first ticket type
        if (mockTickets.length > 0) {
          setSelectedTicket(mockTickets[0].id);
          onTicketSelect(mockTickets[0].id, mockTickets[0].name, mockTickets[0].price);
        }
      } catch (err) {
        console.error('Error fetching ticket types:', err);
        setError('Unable to load ticket options');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchTicketTypes();
    }
  }, [sessionId, onTicketSelect]);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    const ticket = ticketTypes.find(t => t.id === ticketId);
    if (ticket) {
      onTicketSelect(ticket.id, ticket.name, ticket.price);
    }
  };

  if (isLoading) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} text-red-600 p-4 bg-red-50 rounded-lg`}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <h4 className="font-semibold text-lg mb-3 text-ocean-blue-800">Select Ticket Type</h4>
      <div className="space-y-3">
        {ticketTypes.map((ticket) => (
          <div 
            key={ticket.id}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              selectedTicket === ticket.id 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 hover:border-teal-300'
            }`}
            onClick={() => handleTicketSelect(ticket.id)}
          >
            <div className="flex items-center">
              <FaTicketAlt className={`text-xl mr-3 ${
                selectedTicket === ticket.id ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">{ticket.name}</h5>
                  <span className="font-bold">${ticket.price}</span>
                </div>
                {ticket.description && (
                  <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
