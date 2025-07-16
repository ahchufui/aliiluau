import { NextRequest, NextResponse } from 'next/server';
import { 
  getTicketById, 
  updateTicket, 
  deleteTicket, 
  verifyAdminAccess 
} from '@/lib/tickets/service';

// GET a specific ticket by ID (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the admin secret key from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const secretKey = authHeader?.split(' ')[1] || '';
  
  // Verify admin access
  if (!verifyAdminAccess(secretKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const ticket = getTicketById(params.id);
    
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
    
    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error getting ticket:', error);
    return NextResponse.json({ error: 'Failed to get ticket' }, { status: 500 });
  }
}

// PUT update a ticket (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the admin secret key from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const secretKey = authHeader?.split(' ')[1] || '';
  
  // Verify admin access
  if (!verifyAdminAccess(secretKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const updates = await request.json();
    const updatedTicket = updateTicket(params.id, updates);
    
    if (!updatedTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}

// DELETE a ticket (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the admin secret key from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const secretKey = authHeader?.split(' ')[1] || '';
  
  // Verify admin access
  if (!verifyAdminAccess(secretKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const success = deleteTicket(params.id);
    
    if (!success) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
}
