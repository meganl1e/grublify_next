import { createProfileFromEmail, addProfileToList } from '@/lib/klaviyo-client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create profile in Klaviyo
    const profile = await createProfileFromEmail(email);

    if (!profile) {
      throw new Error('Failed to create Klaviyo profile');
    }

    // Add to email list (you'll need to set this environment variable)
    const listId = process.env.KLAVIYO_EMAIL_LIST_ID;
    if (listId) {
      try {
        await addProfileToList(profile.id, listId);
      } catch (listError) {
        console.error('Failed to add to list:', listError);
        // Continue anyway - profile was created successfully
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to email list',
        profileId: profile.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email signup error:', error);
    
    // Check if it's a duplicate email error (common with Klaviyo)
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'You\'re already subscribed to our email list!' 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to subscribe to email list. Please try again.' 
      },
      { status: 500 }
    );
  }
} 