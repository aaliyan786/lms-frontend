'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/_config/firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (( !loading && !user ) || error ) {
      router.push('/sign-in'); // Redirect to the login page
    }
  }, [user, loading, router, error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  return <>{children}</>;
};
