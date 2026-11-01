// app/lib/stores/noteStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);