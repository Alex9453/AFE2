import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token');

  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET!);
    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
}