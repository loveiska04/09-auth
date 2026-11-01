// app/notes/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? 'All Notes' : slug[0];

  return {
    title: `NoteHub - ${tag}`,
    description: `Browse notes tagged with "${tag}" on NoteHub, your digital note-taking app.`,
    openGraph: {
      title: `NoteHub - ${tag}`,
      description: `Browse notes tagged with "${tag}" on NoteHub, your digital note-taking app.`,
      url: 'https://notehub-public.goit.study/api/notes',
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
      title: `NoteHub - ${tag}`,
      description: `Browse notes tagged with "${tag}" on NoteHub, your digital note-taking app.`,
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
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;

  const tag = slug[0] === 'All' ? undefined : slug[0];
  // Fetch notes from API
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;