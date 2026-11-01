//app(public routes)/sign-in/page.tsx

'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientApi';
import { LoginRequest } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValue = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValue);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Sign-in failed - Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during sign-in');
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div>
      <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </div>
  );
}