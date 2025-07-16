import { NextRequest, NextResponse } from 'next/server';
import { getAdminAccessPath } from '@/lib/tickets/service';

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    const adminPath = getAdminAccessPath();
    
    // Check if the provided path matches the admin path
    const isValid = path === adminPath;
    
    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Error verifying admin path:', error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
