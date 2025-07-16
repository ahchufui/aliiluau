'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for TryBooking data
interface EventSession {
  id: number;
  eventStartDate: string;
  eventEndDate: string;
  alternateLabel: string;
  sessionStatus: string;
  sessionAvailability: number;
  sessionCapacity: number;
  availabilityStatus?: {
    label: string;
    colorClass: string;
  };
  lastChecked?: string;
}

interface EventDetails {
  name: string;
  eventId: number;
  description: string;
  venue: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  sessionList: EventSession[];
  [key: string]: any; // Allow for additional properties
}

interface TryBookingContextType {
  eventDetails: EventDetails | null;
  sessions: EventSession[];
  isLoading: boolean;
  error: string | null;
  refreshEventData: () => Promise<void>;
  checkAvailability: (sessionId: number) => Promise<any>;
  isCheckingAvailability: boolean;
}

// Create the context
const TryBookingContext = createContext<TryBookingContextType | undefined>(undefined);

// Custom hook to use the context
export const useTryBooking = () => {
  const context = useContext(TryBookingContext);
  if (context === undefined) {
    throw new Error('useTryBooking must be used within a TryBookingProvider');
  }
  return context;
};

interface TryBookingProviderProps {
  children: ReactNode;
  eventId?: string;
}

export const TryBookingProvider = ({ children, eventId }: TryBookingProviderProps) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState<boolean>(false);

  // Function to check availability for a specific session
  const checkAvailability = async (sessionId: number): Promise<any> => {
    try {
      setIsCheckingAvailability(true);
      
      // Convert number to string for API call
      const sessionIdStr = sessionId.toString();
      
      // Make a real API call to check availability
      const response = await fetch(`/api/trybooking/sessions/${sessionIdStr}`);
      
      if (!response.ok) {
        throw new Error(`Failed to check availability: ${response.status}`);
      }
      
      const sessionData = await response.json();
      
      // Determine availability status
      let statusLabel = 'Available';
      let colorClass = 'bg-green-100 text-green-800';
      
      if (sessionData.sessionAvailability <= 5) {
        statusLabel = 'Almost Full';
        colorClass = 'bg-red-100 text-red-800';
      } else if (sessionData.sessionAvailability <= 20) {
        statusLabel = 'Filling Up';
        colorClass = 'bg-yellow-100 text-yellow-800';
      }
      
      const availabilityData = {
        totalAvailability: sessionData.sessionAvailability,
        status: {
          label: statusLabel,
          colorClass: colorClass
        },
        timestamp: new Date().toISOString()
      };
      
      // Update the session with availability information
      setSessions(prevSessions => {
        return prevSessions.map(session => {
          if (session.id === sessionId) {
            return {
              ...session,
              sessionAvailability: availabilityData.totalAvailability,
              availabilityStatus: {
                label: availabilityData.status.label,
                colorClass: availabilityData.status.colorClass
              },
              lastChecked: availabilityData.timestamp
            };
          }
          return session;
        });
      });
      
      return availabilityData;
    } catch (err: any) {
      console.error('Error checking availability:', err);
      // Don't set global error for availability checks
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  // Function to handle API errors
  const handleApiError = (error: any) => {
    console.error('API Error:', error);
    setError(error.message || 'An error occurred while fetching data');
    setIsLoading(false);
  };
  
  // Function to fetch event data
  const fetchEventData = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Make a real API call to fetch event data
      const response = await fetch(`/api/trybooking/events/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch event data: ${response.status}`);
      }
      
      const eventData = await response.json();
      
      // Process session data to add availability status
      const processedSessions = eventData.sessionList.map((session: any) => {
        let statusLabel = 'Available';
        let colorClass = 'bg-green-100 text-green-800';
        
        if (session.sessionAvailability <= 5) {
          statusLabel = 'Almost Full';
          colorClass = 'bg-red-100 text-red-800';
        } else if (session.sessionAvailability <= 20) {
          statusLabel = 'Filling Up';
          colorClass = 'bg-yellow-100 text-yellow-800';
        }
        
        return {
          ...session,
          availabilityStatus: {
            label: statusLabel,
            colorClass: colorClass
          }
        };
      });
      
      setEventDetails({
        ...eventData,
        sessionList: processedSessions
      });
      setSessions(processedSessions);
      
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to refresh event data
  const refreshEventData = async () => {
    if (eventId) {
      await fetchEventData(eventId);
    }
  };
  
  // Fetch event data on mount and when eventId changes
  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    } else {
      // If no event ID is provided, set an error state
      setError('No event ID provided');
      setIsLoading(false);
    }
  }, [eventId]);
  
  return (
    <TryBookingContext.Provider value={{
      eventDetails,
      sessions,
      isLoading,
      error,
      refreshEventData,
      checkAvailability,
      isCheckingAvailability
    }}>
      {children}
    </TryBookingContext.Provider>
  );
};

export default TryBookingProvider;
