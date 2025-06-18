"use server";
import { cookies } from 'next/headers';

export async function setCodeVerifier(value) {
  cookies().set({
    name: 'code_verifier',
    value: value,
    // secure: process.env.NODE_ENV === 'production',
    // httpOnly: true,
    // sameSite: 'lax',
    // path: '/auth/callback',
    maxAge: 300 // 5 minutes
  });

}
