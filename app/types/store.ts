import type { BlogCollections, Theme } from "./config";
import type { BlogMaskInstance, BlogMenuInstance } from "./components";

export type BlogContent = string;

export type BlogState = {
	activeBlogCollection: Ref<BlogCollections>;
	activeBlogContent: Ref<BlogContent>;
	maskInstance: Ref<BlogMaskInstance | null>;
	menuInstance: Ref<BlogMenuInstance | null>;
};

export type BlogGetter = {
	activePath: ComputedRef<string>;
};

export type BlogActions = {
	setActiveBlogCollection: (newCollection: BlogCollections) => void;
	setActiveBlogContent: (newContent: BlogContent) => void;
	useBlogContent: () => Ref<any>;
	setBlogInstance: (mask: BlogMaskInstance | null, menu: BlogMenuInstance | null) => void;
	changeBlogMenuState: () => void;
};

/**
 * 音乐文件信息接口
 */
export interface MusicInfo {
	/** 文件名（不带扩展名） */
	name: string;
	path: string;
	folder: string;
}

export type SoundState = {
	effectsVolume: Ref<number>;
	musicAudio: Ref<HTMLAudioElement | null>;
	musicCurrent: Ref<MusicInfo | null>;
	musicListCurrent: Ref<MusicInfo[]>;
	musicListNameCurrent: Ref<string | null>;
	musicVolume: Ref<number>;
	playingMusic: Ref<boolean>;
};

export type SoundGetter = {};

export type SoundActions = {
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
	initAudio: (music: MusicInfo) => void;
	play: (music: MusicInfo) => void;
	pause: () => void;
	toggle: () => void;
	previous: () => void;
	next: () => void;
};

export type ThemeState = {
	theme: Ref<Theme>;
};

export type ThemeGetter = {};

export type ThemeActions = {
	setTheme: (theme: Theme) => void;
};
