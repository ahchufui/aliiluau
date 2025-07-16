"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TrybookingEvent, TrybookingSession, getAvailabilityStatus, formatEventDate, formatEventTime } from '@/lib/trybooking/service';
import BookingForm from './BookingForm';
import TicketTypeSelector from './TicketTypeSelector';

export default function BookingCalendar() {
  const searchParams = useSearchParams();
  const initialSessionId = searchParams.get('sessionId');
  const eventIdFromUrl = searchParams.get('eventId'); // Get eventId from URL
  const ticketTypeFromUrl = searchParams.get('ticketType'); // Get ticketType from URL
  
  const [events, setEvents] = useState<TrybookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSession, setSelectedSession] = useState<TrybookingSession | null>(null);
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        // If eventId is provided in URL, fetch only that specific event
        let url = '/api/trybooking/events';
        if (eventIdFromUrl) {
          url = `/api/trybooking/events/${eventIdFromUrl}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        let data;
        if (eventIdFromUrl) {
          // If we fetched a specific event, wrap it in an array
          data = [await response.json()];
        } else {
          // Otherwise, we have an array of events
          data = await response.json();
        }
        
        setEvents(data);
        
        // If sessionId is provided in URL, find and select that session
        if (initialSessionId) {
          const sessionId = parseInt(initialSessionId);
          for (const event of data) {
            const session = event.sessionList.find((s: TrybookingSession) => s.id === sessionId);
            if (session) {
              setSelectedSession(session);
              setSelectedDate(new Date(session.eventStartDate));
              
              // If ticketType is provided, set it as the selected ticket
              if (ticketTypeFromUrl) {
                setSelectedTicket({
                  id: ticketTypeFromUrl,
                  name: ticketTypeFromUrl === 'vip' ? 'VIP Experience' : 
                        ticketTypeFromUrl === 'family' ? 'Family Package' : 'Standard Experience',
                  price: ticketTypeFromUrl === 'vip' ? '179.00' : 
                         ticketTypeFromUrl === 'family' ? '399.00' : '129.00'
                });
              }
              
              break;
            }
          }
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [initialSessionId]);

  // Get all sessions from all events
  const getAllSessions = (): TrybookingSession[] => {
    const allSessions: TrybookingSession[] = [];
    
    events.forEach(event => {
      event.sessionList.forEach(session => {
        allSessions.push(session);
      });
    });
    
    return allSessions;
  };

  // Get all available dates from sessions
  const getAvailableDates = (): Date[] => {
    const sessions = getAllSessions();
    const dates = sessions.map((session: TrybookingSession) => new Date(session.eventStartDate));
    return dates;
  };

  // Get sessions for a specific date
  const getSessionsForDate = (date: Date): TrybookingSession[] => {
    const sessions = getAllSessions();
    return sessions.filter((session: TrybookingSession) => {
      const sessionDate = new Date(session.eventStartDate);
      return (
        sessionDate.getFullYear() === date.getFullYear() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getDate() === date.getDate()
      );
    });
  };

  // Handle date selection
  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
    setSelectedSession(null);
    setShowBookingWidget(false);
  };

  // Handle session selection
  const handleSessionSelect = (session: TrybookingSession): void => {
    setSelectedSession(session);
    setSelectedTicket(null);
    setShowBookingWidget(false);
  };
  
  // Handle ticket type selection
  const handleTicketSelect = (ticketId: string, ticketName: string, ticketPrice: string): void => {
    setSelectedTicket({
      id: ticketId,
      name: ticketName,
      price: ticketPrice
    });
  };

  // Handle booking button click
  const handleBookNowClick = (): void => {
    if (selectedTicket) {
      setShowBookingWidget(true);
    }
  };

  // Get availability status class
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold Out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  const availableDates = getAvailableDates();
  const sessionsForSelectedDate = selectedDate ? getSessionsForDate(selectedDate) : [];

  return (
    <div className="space-y-8">
      {/* Date Picker */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Select a Date</h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          includeDates={availableDates}
          inline
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Available Sessions */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Available Sessions for {selectedDate.toLocaleDateString()}</h3>
          
          {sessionsForSelectedDate.length === 0 ? (
            <p>No sessions available for this date.</p>
          ) : (
            <div className="space-y-4">
              {sessionsForSelectedDate.map(session => {
                const availabilityStatus = getAvailabilityStatus(session);
                const statusClass = getStatusClass(availabilityStatus);
                
                return (
                  <div 
                    key={session.id}
                    className={`border rounded-lg p-4 ${selectedSession?.id === session.id ? 'border-teal-500 bg-teal-50' : 'bg-white'}`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{session.alternateLabel || 'Luau Experience'}</h4>
                        <p className="text-sm text-gray-600">{formatEventTime(session.eventStartDate)} - {formatEventTime(session.eventEndDate)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
                        {availabilityStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Session Details */}
      {selectedSession && (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-3">Selected Session</h3>
          <div className="bg-earth-100 p-4 rounded-lg">
            <h4 className="font-semibold text-lg">{selectedSession.alternateLabel || 'Luau Experience'}</h4>
            <p className="mb-2">{selectedSession.description}</p>
            <p className="text-sm mb-4">
              <span className="font-medium">Date:</span> {formatEventDate(selectedSession.eventStartDate)}<br />
              <span className="font-medium">Time:</span> {formatEventTime(selectedSession.eventStartDate)} - {formatEventTime(selectedSession.eventEndDate)}
            </p>
            
            {/* Ticket Type Selector */}
            {getAvailabilityStatus(selectedSession) !== 'Sold Out' && (
              <div className="mb-4">
                <TicketTypeSelector 
                  sessionId={selectedSession.id} 
                  onTicketSelect={handleTicketSelect} 
                />
              </div>
            )}
            
            <button 
              onClick={handleBookNowClick}
              disabled={getAvailabilityStatus(selectedSession) === 'Sold Out' || !selectedTicket}
              className={`btn-primary w-full ${getAvailabilityStatus(selectedSession) === 'Sold Out' || !selectedTicket ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {getAvailabilityStatus(selectedSession) === 'Sold Out' ? 'Sold Out' : 'Book Now'}
            </button>
          </div>
        </div>
      )}

      {/* Booking Form */}
      {showBookingWidget && selectedSession && selectedTicket && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Complete Your Booking</h3>
          <div className="bg-teal-50 p-3 rounded-lg mb-4">
            <p className="font-medium text-teal-800">Selected Ticket: {selectedTicket.name}</p>
            <p className="text-sm text-teal-700">Price: ${selectedTicket.price} per person</p>
          </div>
          <BookingForm 
            sessionId={`${selectedSession.id}-${selectedTicket.id}`} // Combine session ID and ticket ID
            date={formatEventDate(selectedSession.eventStartDate)}
            time={`${formatEventTime(selectedSession.eventStartDate)} - ${formatEventTime(selectedSession.eventEndDate)}`}
            price={parseFloat(selectedTicket.price)} // Use the selected ticket price
            ticketTypeId={selectedTicket.id} // Pass the ticket type ID explicitly
          />
        </div>
      )}
    </div>
  );
}
