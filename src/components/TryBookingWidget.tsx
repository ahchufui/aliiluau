'use client';

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTicketAlt, FaUsers, FaClock } from 'react-icons/fa';
import { TrybookingEvent, TrybookingSession, formatEventDate, formatEventTime, getAvailabilityStatus } from '@/lib/trybooking/service';
import Link from 'next/link';
import { useTicketPrice } from '@/lib/hooks/useTicketPrice';

interface TryBookingWidgetProps {
  className?: string;
}

export default function TryBookingWidget({
  className = ''
}: TryBookingWidgetProps) {
  const [nextEvent, setNextEvent] = useState<{
    session: TrybookingSession;
    eventName: string;
    event: TrybookingEvent;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ticketPrice, isLoading: isPriceLoading } = useTicketPrice();

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/trybooking/events');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch events');
        }
        
        const events: TrybookingEvent[] = await response.json();
        if (!events || events.length === 0) {
          setError('No upcoming events available');
          return;
        }

        // Get all sessions from all events
        const allSessions: Array<{ session: TrybookingSession; eventName: string; event: TrybookingEvent }> = [];
        events.forEach(event => {
          event.sessionList.forEach(session => {
            allSessions.push({
              session,
              eventName: event.name,
              event
            });
          });
        });
        
        // Sort by start date and filter future events
        const now = new Date();
        const futureSessions = allSessions
          .filter(({ session }) => new Date(session.eventStartDate) > now)
          .sort((a, b) => {
            return new Date(a.session.eventStartDate).getTime() - new Date(b.session.eventStartDate).getTime();
          });

        if (futureSessions.length > 0) {
          const nextEvent = futureSessions[0];
          setNextEvent(nextEvent);
          
          
          // No ticket types needed as there's only general admission
          // Just set the next event without any ticket type handling
        } else {
          setError('No upcoming events scheduled');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load upcoming events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextEvent();
  }, []);

  // Get ticket price
  const getTicketPrice = () => {
    return '$25.00 per person';
  };

  if (isLoading) {
    return (
      <div className={`w-full ${className} flex justify-center items-center py-12`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error || !nextEvent) {
    return (
      <div className={`w-full ${className}`}>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
            <FaCalendarAlt className="text-teal-600 text-xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Next Event</p>
              <p className="font-medium">Coming Soon</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
            <FaClock className="text-teal-600 text-xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Event Time</p>
              <p className="font-medium">To be announced</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <FaTicketAlt className="text-teal-600 mr-2" />
              <h3 className="text-lg font-semibold">Ticket Price</h3>
            </div>
            {isPriceLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <p className="text-xl font-bold text-teal-600">
                  ${ticketPrice?.price?.toFixed(2) || '25.00'} per person
                </p>
                <p className="text-sm text-gray-600">General Admission</p>
              </>
            )}
          </div>
          <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
            <FaUsers className="text-teal-600 text-xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className="font-medium text-yellow-600">Check back soon</p>
            </div>
          </div>
        </div>
        
        <div className="text-center py-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Book Your Pacific Island Experience</h3>
          <Link 
            href="/booking"
            className="inline-block px-8 py-4 bg-white text-teal-600 text-lg font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md"
          >
            View Calendar
          </Link>
          <p className="mt-3 text-sm text-white">
            Check our calendar for upcoming Pacific Island cultural experiences
          </p>
        </div>
        
        <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="mb-2"><strong>Note:</strong> You will be redirected to our secure TryBooking platform to complete your reservation.</p>
          <p>For group bookings of 10+ people, please contact us directly at <a href="mailto:bookings@aliiluau.com.au" className="text-teal-600 hover:underline">bookings@aliiluau.com.au</a></p>
        </div>
      </div>
    );
  }

  const { session, eventName, event } = nextEvent;
  const availabilityStatus = getAvailabilityStatus(session);
  const bookingUrl = `https://www.trybooking.com/${event.eventCode}?session=${session.id}`;
  const eventId = event.eventId.toString(); // Get the event ID for this specific event

  return (
    <div className={`w-full ${className}`}>
      {/* Event details */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
          <FaCalendarAlt className="text-teal-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Next Event</p>
            <p className="font-medium">{formatEventDate(session.eventStartDate)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
          <FaClock className="text-teal-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Event Time</p>
            <p className="font-medium">{formatEventTime(session.eventStartDate)} - {formatEventTime(session.eventEndDate)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
          <FaTicketAlt className="text-teal-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Ticket Price</p>
            <p className="font-medium">{getTicketPrice()}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-ocean-blue-50 rounded-lg">
          <FaUsers className="text-teal-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Availability</p>
            <p className={`font-medium ${availabilityStatus === 'Available' ? 'text-green-600' : 
                            availabilityStatus === 'Limited' ? 'text-yellow-600' : 'text-red-600'}`}>
              {availabilityStatus}
            </p>
          </div>
        </div>
      </div>
      
      {/* No ticket type selection needed */}
      
      {/* Booking button */}
      <div className="text-center py-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Book Your Pacific Island Experience</h3>
        <a 
          href={`${bookingUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-8 py-4 bg-white text-teal-600 text-lg font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md ${availabilityStatus === 'Sold Out' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => {
            if (availabilityStatus === 'Sold Out') {
              e.preventDefault();
            }
          }}
        >
          {availabilityStatus === 'Sold Out' ? 'Sold Out' : 'Book Tickets Now'}
        </a>
        <p className="mt-3 text-sm text-white">
          {session.alternateLabel || eventName} - Secure your spot today!
        </p>
      </div>
      
      {/* Additional information */}
      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p className="mb-2"><strong>Note:</strong> You will be redirected to our secure TryBooking platform to complete your reservation.</p>
        <p>For group bookings of 10+ people, please contact us directly at <a href="mailto:bookings@aliiluau.com.au" className="text-teal-600 hover:underline">bookings@aliiluau.com.au</a></p>
      </div>
    </div>
  );
}
