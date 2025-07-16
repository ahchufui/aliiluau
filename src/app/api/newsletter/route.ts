import { NextResponse } from 'next/server';
import { sendNewsletterConfirmation } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Log the subscription for debugging
    console.log(`Newsletter subscription: ${email}`);
    
    // Send confirmation emails
    const emailSent = await sendNewsletterConfirmation({ email });
    
    if (!emailSent) {
      console.warn('Failed to send email notifications for newsletter subscription');
      // Continue with the process even if email sending fails
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
