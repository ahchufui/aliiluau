import { NextRequest, NextResponse } from 'next/server';
import TrybookingService from '@/lib/trybooking/service';

/**
 * GET handler for /api/trybooking/events/[eventId]
 * Fetches a specific event from the Trybooking API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventId = parseInt(params.eventId);
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }
    
    const event = await TrybookingService.getEventById(eventId);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error(`Error fetching event ${params.eventId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
