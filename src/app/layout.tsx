import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

export const viewport: Viewport = {
  themeColor: '#fcfafe',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'JobBase — Entry-Level Technology Roles & Software Engineering',
  description:
    'Discover verified entry-level and early-career software engineering roles. Apply directly through official employer portals.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Jobbase',
    capable: true,
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#fcfafe]">
      <body className="min-h-screen bg-[#fcfafe] text-[#000000]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
