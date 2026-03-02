export type LoadingStore = {
	loading: boolean;
	loadingRef: SVGSVGElement | null;
	blocksRef: SVGUseElement[];
	setLoading: (loading: boolean) => void;
	setLoadingRef: (ref: SVGSVGElement | null) => void;
	setBlocksRef: (ref: SVGUseElement[]) => void;
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
	checkLoading: () => void;
};

export type SoundState = {
	effectsVolume: globalThis.Ref<number>;
	musicVolume: globalThis.Ref<number>;
};

export type SoundGetter = {};

export type SoundActions = {
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
};

export type Theme = "undertale" | "touhou";

export type ThemeState = {
	theme: globalThis.Ref<Theme>;
};

export type ThemeGetter = {};

export type ThemeActions = {
	setTheme: (theme: Theme) => void;
};
