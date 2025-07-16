import { NextResponse } from 'next/server';
import TrybookingService from '@/lib/trybooking/service';

/**
 * GET handler for /api/trybooking/events
 * Fetches events from the Trybooking API
 */
export async function GET() {
  try {
    const events = await TrybookingService.getEvents();
    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    
    // Check if error is related to missing API credentials
    if (error.message && error.message.includes('API credentials')) {
      return NextResponse.json(
        { error: 'TryBooking API credentials not configured. Please set up your environment variables.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch events from TryBooking API' },
      { status: 500 }
    );
  }
}
