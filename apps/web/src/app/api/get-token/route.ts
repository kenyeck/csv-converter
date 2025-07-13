import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   if (token) {
      return NextResponse.json({ token: token });
   } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
}
