//app/(auth routes)/layouts.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // refresh will cause the data to be reloaded
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;