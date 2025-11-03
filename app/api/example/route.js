// app/api/test/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'

export async function GET(request) {
  // connection with database
  await connectDB()
  return NextResponse.json({ message: 'Success! Your API is working correctly. 🎉' });
}