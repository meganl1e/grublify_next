import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { code_verifier } = await request.json();
  if (!code_verifier) {
    return NextResponse.json({ error: 'Missing code_verifier' }, { status: 400 });
  }
  const cookieStore = await cookies();
  await cookieStore.set({
    name: 'code_verifier',
    value: code_verifier,
    path: '/', // Make available to all routes
    maxAge: 300, // 5 minutes
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return NextResponse.json({ success: true });
} 