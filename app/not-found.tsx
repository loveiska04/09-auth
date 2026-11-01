// app/not-found.tsx
import type { Metadata } from 'next';
import css from './Home.module.css';

// import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found - NoteHub',
  description:
    'The page you are looking for does not exist. Return to NoteHub to continue organizing your notes and ideas',
  openGraph: {
    title: 'Page Not Found - NoteHub',
    description:
      'The page you are looking for does not exist. Return to NoteHub to continue organizing your notes and ideas',
    url: 'https://08-zustand-lemon-eta.vercel.app/not-found',
    siteName: 'NoteHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found - NoteHub',
    description:
      'The page you are looking for does not exist. Return to NoteHub to continue organizing your notes and ideas',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you&#39;re looking for doesn&#39;t exist.
      </p>
      {/* <Link href="/">Go back home</Link> */}
    </div>
  );
};

export default NotFound;