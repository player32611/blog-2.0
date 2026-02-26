'use client';

import { useSoundStore } from '@/stores/soundStore';
import type { useSoundEffectParams } from '@/types/hooks';
import { useEffect, useRef, useState } from 'react';

export const useSoundEffect = ({ audioSrc }: useSoundEffectParams) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { effectsVolume, setEffectsVolume } = useSoundStore();

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.volume = effectsVolume;
    audioRef.current = audio;

    const initializeAudio = async () => {
      try {
        await audio.load();
        setIsInitialized(true);
      } catch (error) {
        console.warn('音频初始化失败:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, effectsVolume]);

  const play = () => {
    if (!audioRef.current || !isInitialized) return;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        audioRef.current?.addEventListener(
          'ended',
          () => {
            setIsPlaying(false);
          },
          { once: true }
        );
      })
      .catch(error => {
        console.error('播放音效失败:', error);
      });
  };

  return {
    isPlaying,
    play,
    effectsVolume,
    setEffectsVolume,
  };
};
