import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, instagram, tiktok, youtube, website, additionalInfo } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // social media validation:
    const hasSocialMedia = instagram || tiktok || youtube || website;
    if (!hasSocialMedia) {
      return NextResponse.json(
        { error: 'Please provide at least one social media handle or website' },
        { status: 400 }
      );
    }

    // Submit to Strapi
    try {
      console.log('Submitting application to Strapi:', {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        name,
        email,
      });

      // Inline the submitContact function to avoid import issues
      const strapiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/affiliates`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name,
              email,
              instagram,
              tiktok,
              youtube,
              website,
              additionalInfo,
              affiliateStatus: 'pending',
              // submittedAt: new Date().toISOString()
            }
          })
        }
      );

      if (!strapiResponse.ok) {
        const errorData = await strapiResponse.json().catch(() => ({}));
        throw new Error(`Failed to application: ${strapiResponse.status} - ${errorData.message || 'Unknown error'}`);
      }

      const strapiData = await strapiResponse.json();

      console.log('Application submitted to Strapi successfully:', {
        id: strapiData?.data?.id,
        name,
        email,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
          applicationId: strapiData?.data?.id
        },
        { status: 200 }
      );

    } catch (strapiError) {
      console.error('Strapi submission error:', strapiError);

      // Fallback: log to console if Strapi fails
      console.log('Application form submission (fallback):', {
        name,
        email,
        timestamp: new Date().toISOString(),
        error: strapiError.message
      });

      // Return error to user when Strapi fails
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to submit application. Please try again later. Submit your application directly to hello@grublify.com.'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Application error:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit application. Please try again later.'
      },
      { status: 500 }
    );
  }
}
