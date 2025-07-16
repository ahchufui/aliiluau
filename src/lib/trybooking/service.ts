import axios from 'axios';
import { encode } from 'base-64';

// Types for Trybooking API responses
export interface TrybookingEvent {
  name: string;
  eventId: number;
  eventCode: string;
  description: string;
  venue: string;
  venueLatitude: string;
  venueLongitude: string;
  onlineEventLink: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  isPublic: boolean;
  allowWaitingList: boolean;
  timeZone: string;
  eventTags: string[];
  bookingUrl: string;
  homepageTemplate: string;
  isOpen: boolean;
  quickSaleUID: string;
  listOfImages: {
    imageFileName: string;
    purpose: string;
    imageOrder: number;
  }[];
  sessionList: TrybookingSession[];
}

export interface TrybookingSession {
  eventStartDate: string;
  eventEndDate: string;
  bookingStartDate: string;
  bookingEndDate: string;
  alternateLabel: string;
  description: string;
  id: number;
  sessionStatus: string;
  sessionCapacity: number;
  sessionAvailability: number;
  sessionBookingUrl: string;
  onlineEventLink: string;
}

// Availability status types
export type AvailabilityStatus = 'Available' | 'Limited' | 'Sold Out';

// Calculate availability status based on capacity and availability
export function getAvailabilityStatus(session: TrybookingSession): AvailabilityStatus {
  if (session.sessionAvailability <= 0) {
    return 'Sold Out';
  } else if (session.sessionAvailability < session.sessionCapacity * 0.2) {
    return 'Limited';
  } else {
    return 'Available';
  }
}

// Format date for display
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format time for display
export function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// No demo data - we'll use only live data from the API

/**
 * Trybooking API service
 * Handles authentication and API calls to the Trybooking API
 */
class TrybookingService {
  private apiKey: string;
  private secretKey: string;
  private region: string;
  private baseUrl: string;
  private authHeader: string;

  constructor() {
    this.apiKey = process.env.TRYBOOKING_API_KEY || '';
    this.secretKey = process.env.TRYBOOKING_SECRET_KEY || '';
    this.region = process.env.TRYBOOKING_REGION || 'au';
    this.baseUrl = `https://api.trybooking.com/${this.region}/reporting/v1`;
    this.authHeader = `Basic ${encode(`${this.apiKey}:${this.secretKey}`)}`;
  }

  /**
   * Get events by account ID
   * @returns Promise<TrybookingEvent[]>
   */
  async getEvents(): Promise<TrybookingEvent[]> {
    try {
      if (!this.apiKey || !this.secretKey) {
        console.error('Trybooking API credentials not found');
        throw new Error('TryBooking API credentials not configured');
      }

      const response = await axios.get(`${this.baseUrl}/event`, {
        headers: {
          Authorization: this.authHeader,
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching events from Trybooking API:', error);
      throw error;
    }
  }

  /**
   * Get event by event ID
   * @param eventId - The event ID
   * @returns Promise<TrybookingEvent>
   */
  async getEventById(eventId: number): Promise<TrybookingEvent | null> {
    try {
      if (!this.apiKey || !this.secretKey) {
        console.error('Trybooking API credentials not found');
        throw new Error('TryBooking API credentials not configured');
      }

      const response = await axios.get(`${this.baseUrl}/event/${eventId}`, {
        headers: {
          Authorization: this.authHeader,
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId} from Trybooking API:`, error);
      throw error;
    }
  }

  /**
   * Get session by session ID
   * @param sessionId - The session ID
   * @returns Promise<TrybookingSession>
   */
  async getSessionById(sessionId: number): Promise<TrybookingSession | null> {
    try {
      if (!this.apiKey || !this.secretKey) {
        console.error('Trybooking API credentials not found');
        throw new Error('TryBooking API credentials not configured');
      }

      const response = await axios.get(`${this.baseUrl}/event/session/${sessionId}`, {
        headers: {
          Authorization: this.authHeader,
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching session ${sessionId} from Trybooking API:`, error);
      throw error;
    }
  }
}

export default new TrybookingService();
