import { Box, Separator, Stack } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import '../markdown.css'; // Ensure you have a CSS file for markdown styles

const privacyPolicyContent = `
This Privacy Policy describes how CSVConvert ("we," "us," or "our") collects, uses, and protects information when you use our file-conversion service at csvconvert.com.

**1. Information We Collect**

**Files & Content** - All file processing (CSV, Excel, JSON, XML, etc.) happens entirely in your browser. We do not upload, store, or access your files on our servers.

**Account Details (Pro users)** - When you subscribe, we collect your name, email address, billing information, and any other data you provide during registration or purchase.

**Usage Data** - We automatically collect anonymous usage metrics (e.g., number of conversions, feature usage, errors) to improve performance and stability.

**Cookies & Tracking** - We use minimal cookies and local storage—for session management, A/B tests, and basic analytics. No third-party ad trackers.

**2. How We Use Your Information**

**Service Delivery** - To manage your subscription, authenticate you, and deliver Pro features.

**Improvement & Support** - To analyze feature usage, diagnose issues, and send you operational updates or support responses.

**Billing & Compliance** - To process payments, prevent fraud, and comply with legal obligations.

**3. Third-Party Service Providers**

We may share limited data with:

   * Payment Processors (Stripe, Coinbase, etc.) for billing.
   * Email & Support Tools (e.g. SendGrid, Intercom) to send transactional emails and support messages.
   * Analytics Platforms (e.g. Google Analytics)—only anonymous, aggregate data.

**4. Data Retention**

**Account & Billing Data** - Retained as long as you maintain a Pro subscription plus any period required by law.

**Usage Metrics** - Stored in aggregate form; individual records purged after 12 months.

**Your Files** - Never collected or stored.

**5. Security**

We use industry-standard encryption (HTTPS/TLS) for all data in transit. Pro account data is stored in encrypted databases with restricted access. Regular security reviews and updates help protect your information.

**6. Your Rights**

**Access & Correction** - You can view or update your account information by logging in or contacting support.

**Deletion** - You may request deletion of your personal data (account, billing info) by emailing privacy@csvforge.com.

**Opt-Out** - Unsubscribe from marketing communications via the link in our emails. Operational emails (billing, security) cannot be opted out.

**7. Changes to This Policy**

We may update this Privacy Policy; the "Last updated" date will reflect any changes. Continued use after updates constitutes acceptance.

**8. Contact Us**

If you have questions or requests regarding this policy, please email:
privacy@csvconvert.com
`;

export default function PrivacyPolicyPage() {
   return (
      <Box p={8}>
         <Box mb={4}>
            <Stack direction={'column'} alignItems={'center'}>
               <Box as="h1" fontSize="2xl" fontWeight="bold">
                  Privacy Policy
               </Box>
               <Box as="p" mb={'2em'} color={'fg.muted'} fontSize="sm">
                  Last Updated: June 21, 2025
               </Box>
            </Stack>
            <Separator mb={4} />
            <Box className="markdown-content">
               <ReactMarkdown>{privacyPolicyContent}</ReactMarkdown>
            </Box>
         </Box>
      </Box>
   );
}
