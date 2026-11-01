// app/(public routes)/sign-up/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';

import css from './SignUpPage.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValue = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValue);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Registration failed - Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>

        {error && <p className={css.errorMessage}>{error}</p>}
      </form>
    </main>
  );
}