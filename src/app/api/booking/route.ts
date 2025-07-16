import { NextResponse } from 'next/server';

// This would be stored securely in environment variables
const TRYBOOKING_API_KEY = process.env.TRYBOOKING_API_KEY || 'demo-api-key';
const TRYBOOKING_API_URL = process.env.TRYBOOKING_API_URL || 'https://api.trybooking.com/v1';

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would make a request to the Trybooking API
    // For now, we'll return mock data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock available sessions based on the date
    const day = new Date(date).getDay();
    let availableSessions = [];
    
    // Wednesday (3), Friday (5), Saturday (6), Sunday (0)
    if (day === 3 || day === 5 || day === 6) {
      availableSessions.push({
        id: `session-${date}-evening`,
        time: '6:00 PM - 9:00 PM',
        availableSeats: Math.floor(Math.random() * 50) + 10,
        price: 129.99
      });
    } else if (day === 0) { // Sunday
      availableSessions.push({
        id: `session-${date}-evening`,
        time: '5:00 PM - 8:00 PM',
        availableSeats: Math.floor(Math.random() * 50) + 10,
        price: 129.99
      });
    }
    
    return NextResponse.json(
      { 
        success: true, 
        date,
        availableSessions
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching available sessions:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching available sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, sessionId, tickets, customerInfo, ticketTypeId } = body;

    // Validate required fields
    if (!date || !sessionId || !tickets || !customerInfo) {
      return NextResponse.json(
        { success: false, message: 'Missing required booking information' },
        { status: 400 }
      );
    }
    
    // Parse the session ID to extract ticket type if combined format is used (sessionId-ticketType)
    let actualSessionId = sessionId;
    let actualTicketTypeId = ticketTypeId || 'standard';
    
    if (sessionId.includes('-')) {
      const parts = sessionId.split('-');
      actualSessionId = parts[0];
      actualTicketTypeId = parts[1];
    }

    // Validate customer info
    const { name, email, phone } = customerInfo;
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Get ticket type details based on the ticket type ID
    const ticketTypes = {
      standard: {
        name: 'Standard Experience',
        price: 60.00,
        description: 'Full luau experience with dinner and show'
      },
      vip: {
        name: 'VIP Experience',
        price: 90.00,
        description: 'Premium seating, welcome drink, and photo opportunity with performers'
      },
      family: {
        name: 'Family Package',
        price: 180.00,
        description: '2 adults and 2 children (ages 5-12)'
      }
    };
    
    // Get the selected ticket type or default to standard
    const selectedTicketType = ticketTypes[actualTicketTypeId as keyof typeof ticketTypes] || ticketTypes.standard;
    
    // In a real implementation, you would:
    // 1. Make a request to the Trybooking API to create a booking
    // 2. Process payment information
    // 3. Store booking information in your database
    
    // For now, we'll simulate a successful booking
    console.log('Booking request:', { 
      date, 
      sessionId: actualSessionId, 
      ticketType: actualTicketTypeId,
      ticketDetails: selectedTicketType,
      tickets, 
      customerInfo 
    });
    
    // Generate a random booking reference
    const bookingReference = `ALI${Math.floor(100000 + Math.random() * 900000)}`;
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your booking has been confirmed!',
        bookingReference,
        date,
        sessionId,
        tickets,
        totalAmount: tickets.adults * 129.99 + tickets.children * 79.99,
        customerInfo: {
          name,
          email,
          phone
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your booking' },
      { status: 500 }
    );
  }
}
