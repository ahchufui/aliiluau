"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrybookingEvent, TrybookingSession, getAvailabilityStatus, formatEventDate, formatEventTime } from '@/lib/trybooking/service';
import { useTicketPrice } from '@/lib/hooks/useTicketPrice';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<TrybookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ticketPrice, isLoading: isPriceLoading } = useTicketPrice();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/trybooking/events');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch events');
        }
        
        const data = await response.json();
        if (!data || data.length === 0) {
          setError('No upcoming events available at this time. Please check back later.');
        } else {
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load upcoming events. Please check that TryBooking API credentials are configured correctly.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get all sessions from all events and sort by date
  const getAllSessions = () => {
    const allSessions: Array<{ session: TrybookingSession; eventName: string; eventId: string; eventCode: string }> = [];
    
    events.forEach(event => {
      event.sessionList.forEach(session => {
        allSessions.push({
          session,
          eventName: event.name,
          eventId: event.eventId.toString(), // Include the event ID
          eventCode: event.eventCode // Include the event code for direct TryBooking links
        });
      });
    });
    
    // Sort by start date
    return allSessions.sort((a, b) => {
      return new Date(a.session.eventStartDate).getTime() - new Date(b.session.eventStartDate).getTime();
    });
  };

  // Filter to only show future sessions
  const getUpcomingSessions = () => {
    const now = new Date();
    return getAllSessions().filter(({ session }) => {
      return new Date(session.eventStartDate) > now;
    }).slice(0, 6); // Show only the next 6 upcoming sessions
  };

  // Get availability status class
  const getStatusClass = (status: string) => {
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

  const upcomingSessions = getUpcomingSessions();

  if (upcomingSessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">No upcoming events scheduled at this time.</p>
        <p className="mt-2">Please check back soon for new events.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcomingSessions.map(({ session, eventName, eventId, eventCode }) => {
        const availabilityStatus = getAvailabilityStatus(session);
        const statusClass = getStatusClass(availabilityStatus);
        
        return (
          <div key={session.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
            <div className="p-6">
              <h3 className="font-display font-semibold text-xl mb-2">{session.alternateLabel || eventName}</h3>
              <p className="text-gray-600 mb-4">{session.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatEventDate(session.eventStartDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatEventTime(session.eventStartDate)} - {formatEventTime(session.eventEndDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isPriceLoading ? (
                    <span>Loading price...</span>
                  ) : (
                    <span>
                      <strong>${ticketPrice?.price?.toFixed(2) || '25.00'}</strong> per person
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
                    {availabilityStatus}
                  </span>
                  
                  <a 
                    href={`https://www.trybooking.com/${eventCode}?session=${session.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary text-sm ${availabilityStatus === 'Sold Out' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-disabled={availabilityStatus === 'Sold Out'}
                  >
                    {availabilityStatus === 'Sold Out' ? 'Sold Out' : 'Book Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
