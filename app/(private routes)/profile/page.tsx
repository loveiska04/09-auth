//app(private-routes)/profile/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import React from 'react';
import css from './ProfilePage.module.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'NoteHub - Your Digital Note-Taking App',
  description:
    'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
  openGraph: {
    title: 'NoteHub - Your Digital Note-Taking App',
    description:
      'Organize your thoughts, ideas, and tasks with NoteHub - the ultimate note-taking application for productivity and creativity.',
    url: 'https://notehub.com',
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

const pageProfile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default pageProfile;