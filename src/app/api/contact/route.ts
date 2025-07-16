import { NextResponse } from 'next/server';
import { sendContactFormNotification } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Log the submission for debugging
    console.log('Contact form submission:', { name, email, phone, message });
    
    // Send email notifications
    const emailSent = await sendContactFormNotification({ name, email, phone, message });
    
    if (!emailSent) {
      console.warn('Failed to send email notifications for contact form submission');
      // Continue with the process even if email sending fails
    }

    // Return a success response
    return NextResponse.json(
      { success: true, message: 'Your message has been sent! We\'ll get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
