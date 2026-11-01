import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub - Your Digital Note-Taking App',
  description:
    'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
  openGraph: {
    title: 'NoteHub - Your Digital Note-Taking App',
    description:
      'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
    url: 'https://notehub.com',
    siteName: 'NoteHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub - Your Digital Note-Taking App',
    description:
      'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}