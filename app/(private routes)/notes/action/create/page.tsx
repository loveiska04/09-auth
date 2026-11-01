//app/notes/action/create/page.tsx
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'NoteHub - Your Digital Note-Taking App',
  description:
    'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
  openGraph: {
    title: 'NoteHub - Your Digital Note-Taking App',
    description:
      'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
    url: 'https://08-zustand-lemon-eta.vercel.app/notes/action/create',
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

const CreateNotePage = () => {
  return (
    <div>
      Create Note Page - Form will go here
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          {<NoteForm />}
        </div>
      </main>
    </div>
  );
};

export default CreateNotePage;