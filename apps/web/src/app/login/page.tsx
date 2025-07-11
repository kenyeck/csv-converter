'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
   const session = useSession();
   const router = useRouter();

   useEffect(() => {
      const logout = async () => {
         if (session) {
            await signOut({ callbackUrl: '/' });
         }
         router.replace('/');
      };
      logout();
   }, []);

   return null;
}
