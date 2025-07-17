import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { NextAuthConfig } from 'next-auth';

const authConfig: NextAuthConfig = {
   providers: [Google, GitHub],
   session: {
      strategy: 'jwt'
   },
   pages: {
      signIn: '/register',
      signOut: '/login'
   }
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
