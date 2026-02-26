export type LoadingStore = {
  loading: boolean;
  loadingRef: HTMLDivElement | null;
  setLoading: (loading: boolean) => void;
  setLoadingRef: (ref: HTMLDivElement | null) => void;
};

export type SoundStore = {
  effectsVolume: number;
  musicVolume: number;
  setEffectsVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
};

export type Theme = 'undertale' | 'dark';

export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
