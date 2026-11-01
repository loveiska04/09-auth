// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const checkServerSession = async (cookieHeader?: string) => {
  const cookieHeaderValue =
    cookieHeader ?? (await cookies()).toString();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieHeaderValue,
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}

export const fetchNotes = async (params: FetchNotesParams) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<NoteHttpResponse>('/notes', {
    params: {
      search: params.search,
      page: params.page,
      perPage: 10,
      tag: params.tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
