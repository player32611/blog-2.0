export type BlogCollections = "front_end" | "back_end" | "gms2" | "algorithm" | "deep_learning";

export type BlogContent = string;

export type BlogState = {
	activeBlogCollection: Ref<BlogCollections>;
	activeBlogContent: Ref<BlogContent>;
};

export type BlogGetter = {
	activePath: ComputedRef<string>;
};

export type BlogActions = {
	setActiveBlogCollection: (newCollection: BlogCollections) => void;
	setActiveBlogContent: (newContent: BlogContent) => void;
	useBlogContent: () => Ref<any>;
};

export type SoundState = {
	effectsVolume: Ref<number>;
	musicVolume: Ref<number>;
};

export type SoundGetter = {};

export type SoundActions = {
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
};

export type Theme = "undertale" | "touhou";

export type ThemeState = {
	theme: Ref<Theme>;
};

export type ThemeGetter = {};

export type ThemeActions = {
	setTheme: (theme: Theme) => void;
};
