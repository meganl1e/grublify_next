import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 9;
    
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?fields=slug&fields=title&fields=excerpt&populate=coverImage&populate=categories&fields=publishedDate&sort=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch blogs: ${res.status}` },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    
    return NextResponse.json({
      blogs: data?.data || [],
      pagination: data?.meta?.pagination || null,
      total: data?.meta?.pagination?.total || 0
    });
    
  } catch (error) {
    console.error('Error in blogs API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
