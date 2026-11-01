// app/notes/filter/@sidebar/default.tsx
import React from 'react';
import Link from 'next/link';

import css from './SidebarNotes.module.css';

const NoteSidebar = async () => {
  const Tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={'/notes/action/create'} className={css.menuLink}>
            Create Note
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All
          </Link>
        </li>
        {Tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteSidebar;