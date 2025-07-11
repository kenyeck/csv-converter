'use client';

import { useState, useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Link from 'next/link';

export const CookieBanner = () => {
   const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

   useEffect(() => {
      // Check if consent has been given on initial load
      const consent = getCookieConsentValue('userConsent');
      setCookieConsent(consent === 'true' ? true : consent === 'false' ? false : null);
   }, []);

   // Function to handle enabling/disabling third-party services
   useEffect(() => {
      if (cookieConsent === true) {
         // Enable services like Google Analytics or Stripe tracking here
         // Example: window.gtag('consent', 'update', { analytics_storage: 'granted' });
      } else if (cookieConsent === false) {
         // Disable non-essential cookies and tracking
         // Example: window.gtag('consent', 'update', { analytics_storage: 'denied' });
      }
   }, [cookieConsent]);

   return (
      <CookieConsent
         location="bottom"
         cookieName="userConsent"
         buttonText="Accept Cookies"
         declineButtonText="Decline"
         enableDeclineButton
         overlay
         onAccept={() => {
            setCookieConsent(true);
         }}
         onDecline={() => {
            setCookieConsent(false);
         }}
         style={{
            background: 'lightgray',
            color: 'fg.muted',
            fontSize: '14px',
            alignItems: 'center'
         }}
         buttonStyle={{ background: 'blue', color: 'white', fontSize: '14px', borderRadius: '4px' }}
         declineButtonStyle={{
            background: 'white',
            color: 'fg',
            fontSize: '14px',
            borderRadius: '4px'
         }}
         expires={150}
      >
         This website uses cookies and collects personal information to enhance your experience and
         provide analytics.
         <br />
         Learn more in our{' '}
         <Link href="/privacy" style={{ textDecoration: 'underline' }}>
            Privacy Policy
         </Link>
         .
      </CookieConsent>
   );
};
