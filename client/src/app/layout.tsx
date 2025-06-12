import { Nav } from '@components/Nav';
import { Provider } from './Provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Note hydration warning is suppressed due to ThemeToggle component
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider><Nav>{children}</Nav></Provider>
      </body>
    </html>
  );
}