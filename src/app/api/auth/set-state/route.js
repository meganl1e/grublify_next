import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { state } = await request.json();
  if (!state) {
    return NextResponse.json({ error: 'Missing state' }, { status: 400 });
  }
  const cookieStore = await cookies();
  await cookieStore.set({
    name: 'state',
    value: state,
    path: '/', // Make available to all routes
    maxAge: 300, // 5 minutes
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return NextResponse.json({ success: true });
} 