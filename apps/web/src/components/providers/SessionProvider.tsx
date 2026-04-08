'use client';

import { SessionProvider as NextAuthSessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect, useRef } from 'react';
import { addUpdateUser } from '@lib/api';

function SyncUser() {
   const { data: session } = useSession();
   const hasSynced = useRef(false);

   useEffect(() => {
      if (session && session.user && !hasSynced.current) {
         hasSynced.current = true;
         addUpdateUser(session.user, session).catch((err) => console.error(err));
      }
   }, [session]);

   return null;
}

export default function SessionProvider({ children }: { children: ReactNode }) {
   return (
      <NextAuthSessionProvider>
         {children}
         <SyncUser />
      </NextAuthSessionProvider>
   );
}