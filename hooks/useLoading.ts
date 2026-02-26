'use client';

import { useLoadingStore } from '@/stores/loadingStore';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const useLoading = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { loading, setLoading, loadingRef, setLoadingRef } = useLoadingStore();

  const loadingIn = useCallback(
    (target?: string) => {
      loadingRef?.classList.remove('loading_out');
      setLoading(true);
      if (target) {
        router.push(target);
      }
    },
    [loadingRef, setLoading, router]
  );

  const loadingOut = useCallback(() => {
    loadingRef?.classList.add('loading_out');
    setLoading(false);
  }, [loadingRef, setLoading]);

  const loadingInit = useCallback(
    (loadingRef: HTMLDivElement) => {
      setLoadingRef(loadingRef);
    },
    [setLoadingRef]
  );

  useEffect(() => {
    loadingOut();
  }, [pathname, loadingOut]);

  useEffect(() => {
    const handlePopState = () => {
      loadingIn();
      setTimeout(() => {
        loadingOut();
      }, 1000);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loadingIn, loadingOut]);

  return {
    loadingInit,
    loadingIn,
    loadingOut,
  };
};
