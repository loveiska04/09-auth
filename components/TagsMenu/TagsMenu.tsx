'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const Tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              onClick={toggle}
              className={css.menuLink}
            >
              All
            </Link>
          </li>
          {Tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;