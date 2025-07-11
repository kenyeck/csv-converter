import { addUpdateUser } from '@lib/api';
import NextAuth, { AuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const authConfig: AuthOptions = {
   providers: [
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      }),
      GitHub({
         clientId: process.env.GITHUB_CLIENT_ID ?? '',
         clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
      })
   ],
   pages: {
      signIn: '/register',
      signOut: '/login',
   },
   callbacks: {
      async jwt({ token, account, user }) {
         if (user) {
            const result = await addUpdateUser(user);
            token.userId = result._id.toString();
            token.accessToken = account?.access_token;
         }
         return token;
      }
   }
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
