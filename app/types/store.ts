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

/**
 * 音乐文件信息接口
 */
export interface MusicInfo {
	/** 文件名（不带扩展名） */
	name: string;
	/** 文件路径 */
	path: string;
}

export type SoundState = {
	effectsVolume: Ref<number>;
	musicVolume: Ref<number>;
	musicCurrent: Ref<MusicInfo | null>;
	musicList: Ref<MusicInfo[]>;
	isPlaying: Ref<boolean>;
};

export type SoundGetter = {};

export type SoundActions = {
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
	setMusicCurrent: (music: MusicInfo) => void;
	setMusicList: (list: MusicInfo[]) => void;
	setIsPlaying: (playing: boolean) => void;
	previousMusic: () => void;
	nextMusic: () => void;
};

export type Theme = "undertale" | "touhou";

export type ThemeState = {
	theme: Ref<Theme>;
};

export type ThemeGetter = {};

export type ThemeActions = {
	setTheme: (theme: Theme) => void;
};
