// app/(.)notes/[id]/NoteDetails.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';

import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
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
  const onClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={onClose}>
      <div>
        <button className={css.backBtn} onClick={onClose}>
          Back
        </button>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <p className={css.tag}>{note.tag}</p>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;