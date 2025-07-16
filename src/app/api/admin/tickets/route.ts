import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllTickets, 
  createTicket, 
  updateTicket, 
  deleteTicket, 
  verifyAdminAccess 
} from '@/lib/tickets/service';
import { TicketType } from '@/lib/types/ticket';

// GET all tickets (admin only)
export async function GET(request: NextRequest) {
  // Get the admin secret key from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const secretKey = authHeader?.split(' ')[1] || '';
  
  // Verify admin access
  if (!verifyAdminAccess(secretKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const tickets = getAllTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error getting tickets:', error);
    return NextResponse.json({ error: 'Failed to get tickets' }, { status: 500 });
  }
}

// POST create a new ticket (admin only)
export async function POST(request: NextRequest) {
  // Get the admin secret key from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const secretKey = authHeader?.split(' ')[1] || '';
  
  // Verify admin access
  if (!verifyAdminAccess(secretKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const ticketData = await request.json();
    
    // Validate required fields
    if (!ticketData.name || !ticketData.description || ticketData.price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    try {
      const newTicket = createTicket({
        name: ticketData.name,
        description: ticketData.description,
        price: Number(ticketData.price),
        order: Number(ticketData.order || 1),
        isActive: ticketData.isActive !== false
      });
      return NextResponse.json(newTicket, { status: 201 });
    } catch (createError) {
      console.error('Error creating ticket:', createError);
      return NextResponse.json({ 
        error: 'Failed to create ticket', 
        details: createError instanceof Error ? createError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
