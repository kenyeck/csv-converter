// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { NextAuthConfig } from 'next-auth';

declare module 'next-auth' {
   interface Session {
      userId?: string;
      accessToken?: string;
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      userId?: string;
      accessToken?: string;
   }
}
