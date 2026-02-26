'use client';

import { useLoading } from '@/hooks/useLoading';
import { useEffect, useRef } from 'react';
import './index.scss';

export default function Loading() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const { loadingInit } = useLoading();

  useEffect(() => {
    loadingInit(loadingRef.current!);
  }, [loadingInit]);

  return (
    <div className="loading" ref={loadingRef}>
      loading...
    </div>
  );
}
