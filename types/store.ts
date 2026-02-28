export type LoadingStore = {
	loading: boolean;
	loadingRef: SVGSVGElement | null;
	setLoading: (loading: boolean) => void;
	setLoadingRef: (ref: SVGSVGElement | null) => void;
};

export type SoundStore = {
	effectsVolume: number;
	musicVolume: number;
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
};

export type Theme = "undertale" | "touhou";

export type ThemeStore = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};
