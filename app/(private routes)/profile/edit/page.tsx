//app(private-routes)/profile/edit/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    getMe()
      .then(user => {
        setuserName(user.username ?? '');
        setEmail(user.email ?? '');
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updateUser = await updateMe({ username });
      setUser(updateUser); // Update user in global state
      router.push('/profile'); // Redirect to profile page after successful update
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page (profile)
  };

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}