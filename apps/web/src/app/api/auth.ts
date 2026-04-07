import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { NextAuthConfig } from 'next-auth';

const authConfig: NextAuthConfig = {
   providers: [Google, GitHub],
   session: {
      strategy: 'jwt'
   },
   callbacks: {
      async jwt({ token, account, profile }) {
         if (account) {
            token.accessToken = account.access_token;
            token.userId = profile?.id ?? token.userId;
         }
         return token;
      },
      async session({ session, token }) {
         session.userId = token.userId;
         session.accessToken = token.accessToken;
         return session;
      }
   },
   pages: {
      signIn: '/register',
      signOut: '/login'
   }
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
