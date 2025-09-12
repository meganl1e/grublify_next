import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Submit to Strapi
    try {
      console.log('Submitting contact form to Strapi:', {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        name,
        email,
        subject: subject || 'General Inquiry'
      });

      // Inline the submitContact function to avoid import issues
      const strapiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name,
              email,
              subject: subject || 'General Inquiry',
              message,
              status: 'new',
              submittedAt: new Date().toISOString()
            }
          })
        }
      );

      if (!strapiResponse.ok) {
        const errorData = await strapiResponse.json().catch(() => ({}));
        throw new Error(`Failed to submit contact: ${strapiResponse.status} - ${errorData.message || 'Unknown error'}`);
      }

      const strapiData = await strapiResponse.json();

      console.log('Contact form submitted to Strapi successfully:', {
        id: strapiData?.data?.id,
        name,
        email,
        subject: subject || 'General Inquiry',
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
          contactId: strapiData?.data?.id
        },
        { status: 200 }
      );

    } catch (strapiError) {
      console.error('Strapi submission error:', strapiError);
      
      // Fallback: log to console if Strapi fails
      console.log('Contact form submission (fallback):', {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        timestamp: new Date().toISOString(),
        error: strapiError.message
      });

      // Still return success to user, but log the Strapi error
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
          warning: 'Your message was received but there was a technical issue. Please contact us directly if urgent.'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send your message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
