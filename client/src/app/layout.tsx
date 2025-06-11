import { Nav } from '@components/Nav';
import { Provider } from './Provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider><Nav>{children}</Nav></Provider>
      </body>
    </html>
  );
}