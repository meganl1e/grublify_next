import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 9;

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Search query is required' 
      }, { status: 400 });
    }

    // Build Strapi search query
    const strapiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?` +
      `filters[$or][0][title][$containsi]=${encodeURIComponent(query)}&` +
      `filters[$or][1][excerpt][$containsi]=${encodeURIComponent(query)}&` +
      `fields=slug&fields=title&fields=excerpt&fields=publishedDate&` +
      `populate=coverImage&populate=categories&` +
      `sort=publishedDate:desc&` +
      `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    const response = await fetch(strapiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      blogs: data?.data || [],
      pagination: data?.meta?.pagination || null,
      total: data?.meta?.pagination?.total || 0,
      query: query.trim()
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ 
      error: 'Failed to search blogs' 
    }, { status: 500 });
  }
}
