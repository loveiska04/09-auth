// components/AuthProvider/AuthProvider.tsx

'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      // Check session validity
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        // If the session is valid, fetch user data
        const user = await getMe();
        if (user) setUser(user);
      } else {
        // If the session is invalid, clear the auth state
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;