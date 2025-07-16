'use client';

import { useState, useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Link from 'next/link';
import { useColorMode } from './chakra/ColorModeButton';

export const CookieBanner = () => {
   const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
   const colorMode = useColorMode();

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
         buttonText="Accept all"
         declineButtonText="Required only"
         enableDeclineButton
         overlay
         onAccept={() => {
            setCookieConsent(true);
         }}
         onDecline={() => {
            setCookieConsent(false);
         }}
         style={{
            background: colorMode.colorMode === 'dark' ? 'gray' : 'bg.muted',
            color: colorMode.colorMode === 'dark' ? 'fg.default' : 'fg.muted',
            fontSize: '14px',
            alignItems: 'center'
         }}
         buttonStyle={{ background: 'blue', color: colorMode.colorMode === 'dark' ? 'fg.muted' : 'white', fontSize: '14px', borderRadius: '4px' }}
         declineButtonStyle={{
            background: 'white',
            color: colorMode.colorMode === 'dark' ? 'black' : 'fg.muted',
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
