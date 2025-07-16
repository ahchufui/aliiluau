import { NextRequest, NextResponse } from 'next/server';
import { getActiveTickets } from '@/lib/tickets/service';

// GET active tickets (public)
export async function GET(request: NextRequest) {
  try {
    const tickets = getActiveTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error getting active tickets:', error);
    return NextResponse.json({ error: 'Failed to get tickets' }, { status: 500 });
  }
}
