import { NextRequest, NextResponse } from 'next/server';
import { getActiveTickets } from '@/lib/tickets/service';

// GET the first active ticket (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const activeTickets = getActiveTickets();
    
    if (activeTickets.length === 0) {
      // Return default ticket if no active tickets found
      return NextResponse.json({
        id: 'default',
        name: 'General Admission',
        description: 'Standard entry ticket',
        price: 60,
        order: 1,
        isActive: true
      });
    }
    
    // Sort by order and return the first one
    const sortedTickets = [...activeTickets].sort((a, b) => a.order - b.order);
    return NextResponse.json(sortedTickets[0]);
  } catch (error) {
    console.error('Error getting active ticket:', error);
    return NextResponse.json({ error: 'Failed to get active ticket' }, { status: 500 });
  }
}
