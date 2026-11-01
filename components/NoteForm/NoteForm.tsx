'use client';

import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { createNote } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteDraftStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateNote = async (formData: FormData) => {
    const noteData: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    };

    try {
      await NoteFormSchema.validate(noteData, { abortEarly: false });
      await createNoteMutation.mutateAsync(noteData);
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const errorMessages = validationError.inner.map(error => error.message);
        alert(
          `Please fix the following errors:\n\n${errorMessages.join('\n')}`
        );
      } else {
        alert('Failed to create note. Please try again.');
      }
      throw validationError;
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleCreateNote} className={css.form}>
      <fieldset className={css.formGroup}>
        <label htmlFor="title" className={css.label}>
          Title *
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={css.input}
          placeholder="Enter a descriptive title (3-50 characters)"
          required
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="content" className={css.label}>
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          placeholder="Write your note content here (max 500 characters)"
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>
          Tag *
        </label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          required
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="">-- Choose a category --</option>
          <option value="Todo">📝 Todo</option>
          <option value="Work">💼 Work</option>
          <option value="Personal">🏠 Personal</option>
          <option value="Meeting">👥 Meeting</option>
          <option value="Shopping">🛒 Shopping</option>
        </select>
      </fieldset>

      <div className={css.requiredHint}>* Required fields</div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={createNoteMutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Creating...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}