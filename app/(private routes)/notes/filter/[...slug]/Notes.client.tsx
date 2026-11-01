'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';

// import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import css from './NotesPage.module.css';
import Link from 'next/link';

type NotesClientProps = {
  tag?: string;
};

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data, isFetching, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery, tag],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: debouncedSearchQuery, tag }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    console.log('Search value:', value);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onSearch={handleSearch} />}

          {isSuccess && totalPages > 1 && (
            <Pagination
              totalNumberOfPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {
            <Link className={css.button} href={'/notes/action/create'}>
              Create note +
            </Link>
          }
        </header>
        {data && data.notes.length > 0 && <NoteList notes={data?.notes} />}

        {/* <NoteForm tag={tag} /> */}

        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}
      </div>
    </>
  );
};

export default NotesClient;