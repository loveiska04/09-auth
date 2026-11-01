import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      console.log('Note deleted successfully');
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  if (!notes || notes.length === 0) {
    return <div>No notes found.</div>;
  }

  return (
    <div>
      <h2>NoteList</h2>
      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}