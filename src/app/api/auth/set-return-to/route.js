import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { return_to } = await request.json();
  if (!return_to) {
    return NextResponse.json({ error: 'Missing return_to' }, { status: 400 });
  }
  const cookieStore = await cookies();
  await cookieStore.set({
    name: 'return_to',
    value: return_to,
    path: '/',
    maxAge: 300, // 5 minutes
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return NextResponse.json({ success: true });
} 