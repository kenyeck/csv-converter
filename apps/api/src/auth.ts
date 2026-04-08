import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import type { AuthConfig } from "@auth/core";
import { ExpressAuth, auth } from "@auth/express";

export const authConfig: AuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.accessToken = (account as any).access_token;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.userId = (profile as any)?.id ?? token.userId;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (token as any).userId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accessToken: (token as any).accessToken,
      };
    },
  },
};

export const authHandler = ExpressAuth(authConfig);
export { auth };
