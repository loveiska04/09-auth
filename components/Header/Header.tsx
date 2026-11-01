import React from 'react';
import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';

import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

async function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/action/create">Create Note</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;