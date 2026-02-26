'use client'

import { create } from "zustand";
import type { Theme, ThemeStore } from "@/types/store";

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "undertale",
  setTheme: (theme: Theme) => set(() => ({ theme })),
}));