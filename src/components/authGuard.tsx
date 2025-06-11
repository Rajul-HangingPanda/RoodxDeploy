'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [cookies] = useCookies(['token']);

  React.useEffect(() => {
    // Check if user is authenticated
    const token = cookies.token;
    if (token) {
      // If user is authenticated and trying to access auth pages, redirect to home
      router.push('/');
    }
  }, [cookies.token, router]);

  return <>{children}</>;
}
