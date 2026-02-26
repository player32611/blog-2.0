'use client';

import { create } from 'zustand';
import { SoundStore } from '../types/store';

export const useSoundStore = create<SoundStore>(set => ({
  effectsVolume: 0.7,
  musicVolume: 0.7,
  setEffectsVolume: (volume: number) =>
    set(state => ({
      ...state,
      effectsVolume: Math.max(0, Math.min(1, volume)),
    })),
  setMusicVolume: (volume: number) =>
    set(state => ({
      ...state,
      musicVolume: Math.max(0, Math.min(1, volume)),
    })),
}));
