
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    // Refresh server components when the auth layout mounts
    router.refresh();
  }, [router]);

  return <>{children}</>;
};

export default AuthLayout;
