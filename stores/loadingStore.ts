'use client';

import { create } from 'zustand';
import { LoadingStore } from '../types/store';

export const useLoadingStore = create<LoadingStore>(() => ({
  loading: false,
  loadingRef: null,
  setLoading: (loading: boolean) => useLoadingStore.setState(() => ({ loading })),
  setLoadingRef: (ref: HTMLDivElement | null) =>
    useLoadingStore.setState(() => ({ loadingRef: ref })),
}));
