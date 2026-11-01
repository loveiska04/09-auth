// app/notes/[id]/NoteDetails.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';

import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const handleBack = () => {
    router.back();
  };

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <h3>{note.tag}</h3>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
            <button onClick={handleBack}>Back</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;